import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Program from '@/models/Program';

export async function GET() {
    try {
        await connectDB();
        const programs = await Program.find().sort({ createdAt: -1 });

        // Aggregate global stats
        const stats = await Program.aggregate([
            {
                $group: {
                    _id: null,
                    totalModules: { $sum: '$totalModules' },
                    videoLessons: { $sum: '$videoLessons' },
                    resourcesCount: { $sum: '$resourcesCount' },
                }
            }
        ]);

        const globalStats = stats[0] || {
            totalModules: 0,
            videoLessons: 0,
            resourcesCount: 0
        };

        return NextResponse.json({
            programs: programs.map(p => ({
                id: p._id,
                title: p.name,
                weeks: `${p.weeks} Weeks`,
                modules: `${p.totalModules} Modules`,
                students: `${p.enrolledCount} Students`,
                status: p.isActive ? 'ACTIVE' : 'INACTIVE',
                statusColor: p.isActive ? 'text-green-600' : 'text-gray-500',
                dotColor: p.isActive ? 'bg-green-600' : 'bg-gray-400',
                image: p.imageUrl || '/images/icehub.png',
                badge: p.skillLevel.toUpperCase()
            })),
            stats: [
                { label: 'TOTAL MODULES', value: globalStats.totalModules.toLocaleString(), color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'VIDEO LESSONS', value: globalStats.videoLessons.toLocaleString(), color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'RESOURCES', value: globalStats.resourcesCount.toLocaleString(), color: 'text-green-600', bg: 'bg-green-50' },
            ]
        });
    } catch (error: any) {
        console.error('Error fetching programs:', error);
        return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const {
            name,
            description,
            category,
            duration,
            weeks,
            skillLevel,
            curriculum,
            imageUrl,
            totalModules,
            videoLessons,
            resourcesCount,
            videoUrls,
            resourceUrls
        } = body;

        // Basic validation
        if (!name || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newProgram = new Program({
            name,
            description,
            category,
            duration: duration || `${weeks} Weeks`,
            weeks: Number(weeks),
            skillLevel,
            curriculum: curriculum || [],
            imageUrl,
            totalModules: Number(totalModules) || 0,
            videoLessons: Number(videoLessons) || 0,
            resourcesCount: Number(resourcesCount) || 0,
            videoUrls: videoUrls || [],
            resourceUrls: resourceUrls || [],
            isActive: true,
            enrolledCount: 0
        });

        await newProgram.save();

        return NextResponse.json({
            message: 'Program created successfully',
            program: newProgram
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error creating program:', error);
        return NextResponse.json({ error: error.message || 'Failed to create program' }, { status: 500 });
    }
}
