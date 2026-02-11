import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Availability from '@/models/Availability';
import { isDateAvailable, hasBookingConflict } from '@/utils/bookingUtils';

// GET /api/bookings - Fetch all bookings with optional filters
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const planTitle = searchParams.get('planTitle');
        const status = searchParams.get('status');

        const query: any = {};
        if (email) query.email = email;
        if (planTitle) query.planTitle = planTitle;
        if (status) query.bookingStatus = status;

        const bookings = await Booking.find(query).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            bookings,
        });
    } catch (error: any) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const {
            fullName,
            email,
            phone,
            planTitle,
            selectedPrice,
            bookingType,
            startDate,
            endDate,
            timeSlot,
            paymentReference,
            amount,
        } = body;

        // Validate required fields
        if (!fullName || !email || !phone || !planTitle || !selectedPrice || !bookingType || !startDate || !endDate || !paymentReference || !amount) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if booking with same payment reference already exists
        const existingBooking = await Booking.findOne({ paymentReference });
        if (existingBooking) {
            return NextResponse.json(
                { success: false, error: 'Booking with this payment reference already exists' },
                { status: 400 }
            );
        }

        // Get availability settings for the plan
        const availability = await Availability.findOne({ planTitle });

        if (availability) {
            // Check if date is available
            const dateCheck = isDateAvailable(
                new Date(startDate),
                availability.blockedDates,
                availability.allowWeekends,
                availability.minAdvanceBookingHours,
                availability.maxAdvanceBookingDays
            );

            if (!dateCheck.available) {
                return NextResponse.json(
                    { success: false, error: dateCheck.reason || 'Date not available' },
                    { status: 400 }
                );
            }

            // Check capacity for the booking type
            const existingBookings = await Booking.find({
                planTitle,
                bookingStatus: { $in: ['pending', 'confirmed'] },
                $or: [
                    {
                        startDate: { $lte: new Date(endDate) },
                        endDate: { $gte: new Date(startDate) },
                    },
                ],
            });

            let capacityField: 'maxDailyCapacity' | 'maxWeeklyCapacity' | 'maxMonthlyCapacity';
            switch (bookingType) {
                case 'daily':
                    capacityField = 'maxDailyCapacity';
                    break;
                case 'weekly':
                    capacityField = 'maxWeeklyCapacity';
                    break;
                case 'monthly':
                    capacityField = 'maxMonthlyCapacity';
                    break;
                default:
                    capacityField = 'maxDailyCapacity';
            }

            if (existingBookings.length >= availability[capacityField]) {
                return NextResponse.json(
                    { success: false, error: 'No capacity available for selected dates' },
                    { status: 400 }
                );
            }
        }

        // Create the booking
        const booking = await Booking.create({
            fullName,
            email,
            phone,
            planTitle,
            selectedPrice,
            bookingType,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            timeSlot,
            paymentReference,
            amount,
            paymentStatus: 'successful', // Assuming payment was successful if we're creating booking
            bookingStatus: 'confirmed',
        });

        return NextResponse.json({
            success: true,
            booking,
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
