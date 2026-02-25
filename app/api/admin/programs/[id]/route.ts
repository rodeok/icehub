import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Program from '@/models/Program';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const program = await Program.findById(id);

        if (!program) {
            return NextResponse.json({ error: 'Program not found' }, { status: 404 });
        }

        return NextResponse.json({ program });
    } catch (error: any) {
        console.error('Error fetching program:', error);
        return NextResponse.json({ error: 'Failed to fetch program' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedProgram = await Program.findByIdAndDelete(id);

        if (!deletedProgram) {
            return NextResponse.json({ error: 'Program not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Program deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting program:', error);
        return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
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
            resourceUrls,
            modules
        } = body;

        // Calculate stats from modules if provided
        let calcTotalModules = Number(totalModules) || 0;
        let calcVideoLessons = Number(videoLessons) || 0;
        let calcResourcesCount = Number(resourcesCount) || 0;
        let legacyCurriculum = curriculum || [];
        let legacyVideoUrls = videoUrls || [];

        if (modules && Array.isArray(modules)) {
            calcTotalModules = modules.length;
            calcVideoLessons = modules.reduce((acc: number, mod: any) => acc + (mod.lessons?.length || 0), 0);
            calcResourcesCount = modules.reduce((acc: number, mod: any) =>
                acc + (mod.lessons?.reduce((lAcc: number, lesson: any) => lAcc + (lesson.resources?.length || 0), 0) || 0), 0
            );

            if (legacyCurriculum.length === 0) {
                legacyCurriculum = modules.map((mod: any) => mod.title);
            }
            if (legacyVideoUrls.length === 0) {
                legacyVideoUrls = modules.flatMap((mod: any) =>
                    (mod.lessons || [])
                        .map((lesson: any) => lesson.videoUrl)
                        .filter((url: string) => !!url)
                );
            }
        }

        const updatedProgram = await Program.findByIdAndUpdate(
            id,
            {
                name,
                description,
                category,
                duration: duration || `${weeks} Weeks`,
                weeks: Number(weeks),
                skillLevel,
                curriculum: legacyCurriculum,
                imageUrl,
                totalModules: calcTotalModules,
                videoLessons: calcVideoLessons,
                resourcesCount: calcResourcesCount,
                videoUrls: legacyVideoUrls,
                resourceUrls: resourceUrls || [],
                modules: modules || []
            },
            { new: true }
        );

        if (!updatedProgram) {
            return NextResponse.json({ error: 'Program not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Program updated successfully',
            program: updatedProgram
        });
    } catch (error: any) {
        console.error('Error updating program:', error);
        return NextResponse.json({ error: 'Failed to update program' }, { status: 500 });
    }
}
