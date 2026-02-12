import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Program from '@/models/Program';

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
