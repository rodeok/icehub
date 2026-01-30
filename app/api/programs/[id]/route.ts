import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Program from '@/models/Program';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const program = await Program.findById(params.id);

        if (!program) {
            return NextResponse.json(
                { error: 'Program not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ program }, { status: 200 });
    } catch (error: any) {
        console.error('Get program error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to get program' },
            { status: 500 }
        );
    }
}
