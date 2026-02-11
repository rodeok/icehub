import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

// GET /api/bookings/[id] - Fetch a specific booking
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const booking = await Booking.findById(id);

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error: any) {
        console.error('Error fetching booking:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// PATCH /api/bookings/[id] - Update booking status
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const body = await request.json();
        const { bookingStatus, paymentStatus, notes } = body;

        const updateData: any = {};
        if (bookingStatus) updateData.bookingStatus = bookingStatus;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;
        if (notes !== undefined) updateData.notes = notes;

        const booking = await Booking.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error: any) {
        console.error('Error updating booking:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// DELETE /api/bookings/[id] - Cancel a booking
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const booking = await Booking.findByIdAndUpdate(
            id,
            { bookingStatus: 'cancelled' },
            { new: true }
        );

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Booking cancelled successfully',
            booking,
        });
    } catch (error: any) {
        console.error('Error cancelling booking:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
