import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Program from '@/models/Program';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get('category');

        let query: any = { isActive: true };

        if (category) {
            query.category = category;
        }

        const programs = await Program.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ programs }, { status: 200 });
    } catch (error: any) {
        console.error('Get programs error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to get programs' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const {
            name,
            description,
            category,
            duration,
            price,
            skillLevel,
            curriculum,
            imageUrl,
        } = body;

        // Validation
        if (!name || !description || !category || !duration || price === undefined) {
            return NextResponse.json(
                { error: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        const program = await Program.create({
            name,
            description,
            category,
            duration,
            price,
            skillLevel: skillLevel || 'beginner',
            curriculum: curriculum || [],
            imageUrl,
        });

        return NextResponse.json(
            { message: 'Program created successfully', program },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create program error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create program' },
            { status: 500 }
        );
    }
}
