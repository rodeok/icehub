import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { ObjectId } from 'mongodb';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        let query: any = {};
        if (ObjectId.isValid(id)) {
            query._id = id;
        } else {
            query.uniqueCode = id;
        }

        const deletedUser = await User.findOneAndDelete(query);

        if (!deletedUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        const { action } = body; // expect action: 'suspend' | 'activate'

        let query: any = {};
        if (ObjectId.isValid(id)) {
            query._id = id;
        } else {
            query.uniqueCode = id;
        }

        if (!['suspend', 'activate'].includes(action)) {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        const isActive = action === 'activate';
        const updatedUser = await User.findOneAndUpdate(
            query,
            { isActive },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: `User ${isActive ? 'activated' : 'suspended'} successfully`,
            user: updatedUser
        });
    } catch (error: any) {
        console.error('Error updating user status:', error);
        return NextResponse.json({ error: 'Failed to update user status' }, { status: 500 });
    }
}
