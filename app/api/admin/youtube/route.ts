import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function parseIsoDuration(duration: string) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '00:00';

    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);

    const formattedHours = hours > 0 ? `${hours}:` : '';
    const formattedMinutes = minutes < 10 && hours > 0 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get('admin_session');

        if (!adminSession || adminSession.value !== 'true') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'YouTube URL or ID is required' }, { status: 400 });
        }

        let videoId = url;

        // Extract ID if it's a URL
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const urlObj = new URL(url);
            if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            } else if (urlObj.searchParams.has('v')) {
                videoId = urlObj.searchParams.get('v');
            }
        }

        // Remove additional parameters like ?t= or &feature= from videoId if extracted poorly
        videoId = videoId?.split('?')[0].split('&')[0];

        if (!videoId) {
            return NextResponse.json({ error: 'Invalid YouTube URL or ID' }, { status: 400 });
        }

        const apiKey = process.env.YOUTUBE_API;
        if (!apiKey) {
            console.error('YOUTUBE_API is not set in environment variables');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`);

        if (!response.ok) {
            console.error('YouTube API responded with status:', response.status);
            return NextResponse.json({ error: 'Failed to fetch metadata from YouTube' }, { status: 502 });
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return NextResponse.json({ error: 'Video not found or is private/inaccessible' }, { status: 404 });
        }

        const video = data.items[0];
        const title = video.snippet.title;
        const rawDuration = video.contentDetails.duration;
        const duration = parseIsoDuration(rawDuration);

        return NextResponse.json({
            title,
            duration,
            videoId
        });

    } catch (error: any) {
        console.error('Failed to parse YouTube metadata:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
