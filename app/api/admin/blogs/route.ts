import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Subscriber from '@/models/Subscriber';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    try {
        await connectDB();
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json(blogs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Default to current date string if not provided
        if (!body.date) {
            body.date = new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        }

        // Generate slug from title
        if (body.title && !body.slug) {
            let baseSlug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            // Ensure uniqueness
            let slug = baseSlug;
            let counter = 1;
            while (await Blog.findOne({ slug })) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
            body.slug = slug;
        }

        const newBlog = await Blog.create(body);

        // Notify subscribers
        try {
            const subscribers = await Subscriber.find({}, 'email');
            if (subscribers.length > 0) {
                const subscriberEmails = subscribers.map(sub => sub.email);

                // Prepare email content
                const blogUrl = `https://icehub-ng.com/blogs/${newBlog.slug}`; // Update with the actual production domain later if needed

                await resend.emails.send({
                    from: 'blogmailnot@icehub-ng.com',
                    to: ['blogmailnot@icehub-ng.com'], // Send to the sender to prevent exposing all emails
                    bcc: subscriberEmails,
                    subject: `New Blog Post from ICE HUB: ${newBlog.title}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                <img src="https://icehub-ng.com/images/icehub.png" style="height: 40px; object-fit: contain; margin-right: 15px;" alt="ICE HUB Logo" />
                                <h2 style="color: #1a73e8; margin: 0;">New Blog Published!</h2>
                            </div>
                            <h3>${newBlog.title}</h3>
                            <p>${newBlog.excerpt || 'Checkout our latest blog post.'}</p>
                            <p style="margin-top: 20px;">
                                <a href="${blogUrl}" style="background-color: #1a73e8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Read Full Post</a>
                            </p>
                            <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                            <p style="font-size: 12px; color: #666; text-align: center;">You are receiving this because you subscribed to ICE HUB newsletters.</p>
                        </div>
                    `,
                });
                console.log(`Notification sent to ${subscribers.length} subscribers.`);
            }
        } catch (emailError) {
            console.error("Failed to send subscriber notifications:", emailError);
            // Optionally, we can proceed without failing the blog creation
        }

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
