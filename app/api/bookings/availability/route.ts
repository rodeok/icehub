import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Availability from '@/models/Availability';
import { isDateAvailable, generateTimeSlots } from '@/utils/bookingUtils';
import { startOfDay, endOfDay } from 'date-fns';

// GET /api/bookings/availability - Check availability for a plan on specific dates
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const planTitle = searchParams.get('planTitle');
        const date = searchParams.get('date');
        const bookingType = searchParams.get('bookingType') as 'daily' | 'weekly' | 'monthly' || 'daily';

        if (!planTitle) {
            return NextResponse.json(
                { success: false, error: 'Plan title is required' },
                { status: 400 }
            );
        }

        // Get availability settings
        let availability = await Availability.findOne({ planTitle });

        // If no availability settings exist, create default ones
        if (!availability) {
            availability = await Availability.create({
                planTitle,
                maxDailyCapacity: 10,
                maxWeeklyCapacity: 10,
                maxMonthlyCapacity: 5,
                availableTimeSlots: generateTimeSlots(),
                blockedDates: [],
                allowWeekends: true,
                minAdvanceBookingHours: 2,
                maxAdvanceBookingDays: 90,
                operatingHours: { start: '08:00', end: '18:00' },
                isActive: true,
            });
        }

        // If specific date is requested, check that date
        if (date) {
            const targetDate = new Date(date);
            const dateCheck = isDateAvailable(
                targetDate,
                availability.blockedDates,
                availability.allowWeekends,
                availability.minAdvanceBookingHours,
                availability.maxAdvanceBookingDays
            );

            if (!dateCheck.available) {
                return NextResponse.json({
                    success: true,
                    available: false,
                    reason: dateCheck.reason,
                    timeSlots: [],
                });
            }

            // Check current bookings for this date
            const existingBookings = await Booking.find({
                planTitle,
                bookingStatus: { $in: ['pending', 'confirmed'] },
                startDate: { $lte: endOfDay(targetDate) },
                endDate: { $gte: startOfDay(targetDate) },
            });

            // Determine capacity based on booking type
            let maxCapacity: number;
            switch (bookingType) {
                case 'daily':
                    maxCapacity = availability.maxDailyCapacity;
                    break;
                case 'weekly':
                    maxCapacity = availability.maxWeeklyCapacity;
                    break;
                case 'monthly':
                    maxCapacity = availability.maxMonthlyCapacity;
                    break;
                default:
                    maxCapacity = availability.maxDailyCapacity;
            }

            const availableSlots = maxCapacity - existingBookings.length;

            return NextResponse.json({
                success: true,
                available: availableSlots > 0,
                availableSlots,
                maxCapacity,
                timeSlots: availability.availableTimeSlots,
                operatingHours: availability.operatingHours,
            });
        }

        // Return general availability settings
        return NextResponse.json({
            success: true,
            availability: {
                planTitle: availability.planTitle,
                maxDailyCapacity: availability.maxDailyCapacity,
                maxWeeklyCapacity: availability.maxWeeklyCapacity,
                maxMonthlyCapacity: availability.maxMonthlyCapacity,
                timeSlots: availability.availableTimeSlots,
                blockedDates: availability.blockedDates,
                allowWeekends: availability.allowWeekends,
                minAdvanceBookingHours: availability.minAdvanceBookingHours,
                maxAdvanceBookingDays: availability.maxAdvanceBookingDays,
                operatingHours: availability.operatingHours,
            },
        });
    } catch (error: any) {
        console.error('Error checking availability:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
