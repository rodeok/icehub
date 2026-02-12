import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Instructor from '@/models/Instructor';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedInstructor = await Instructor.findByIdAndDelete(id);

        if (!deletedInstructor) {
            return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Instructor deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting instructor:', error);
        return NextResponse.json({ error: 'Failed to delete instructor' }, { status: 500 });
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

        const updatedInstructor = await Instructor.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        );

        if (!updatedInstructor) {
            return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
        }

        return NextResponse.json(updatedInstructor);
    } catch (error: any) {
        console.error('Error updating instructor:', error);
        return NextResponse.json({ error: 'Failed to update instructor' }, { status: 500 });
    }
}
