import { addDays, addWeeks, addMonths, isBefore, isAfter, startOfDay, endOfDay, parseISO, format, isWeekend } from 'date-fns';

export interface TimeSlot {
    start: string;
    end: string;
    label: string;
}

export interface BookingData {
    planTitle: string;
    bookingType: 'daily' | 'weekly' | 'monthly';
    startDate: Date;
    endDate: Date;
    selectedPrice: string;
}

/**
 * Calculate the end date based on booking type and start date
 */
export function calculateEndDate(startDate: Date, bookingType: 'daily' | 'weekly' | 'monthly'): Date {
    switch (bookingType) {
        case 'daily':
            return endOfDay(startDate);
        case 'weekly':
            return endOfDay(addWeeks(startDate, 1));
        case 'monthly':
            return endOfDay(addMonths(startDate, 1));
        default:
            return endOfDay(startDate);
    }
}

/**
 * Calculate the total price based on duration and base price
 */
export function calculatePrice(basePrice: string, bookingType: 'daily' | 'weekly' | 'monthly', duration?: number): number {
    // Extract numeric value from price string (e.g., "N4,000/day" -> 4000)
    const numericPrice = parseInt(basePrice.replace(/[^0-9]/g, ''));

    if (isNaN(numericPrice)) return 0;

    // If duration is provided (for custom date ranges), use it
    if (duration) {
        return numericPrice * duration;
    }

    // Otherwise use booking type
    switch (bookingType) {
        case 'daily':
            return numericPrice;
        case 'weekly':
            return numericPrice * 7;
        case 'monthly':
            return numericPrice * 30;
        default:
            return numericPrice;
    }
}

/**
 * Generate available time slots for a given date
 */
export function generateTimeSlots(): TimeSlot[] {
    return [
        { start: '09:00', end: '12:00', label: 'Morning (9 AM - 12 PM)' },
        { start: '12:00', end: '17:00', label: 'Afternoon (12 PM - 5 PM)' },
        { start: '09:00', end: '17:00', label: 'Full Day (9 AM - 5 PM)' },
    ];
}

/**
 * Check if a date is available for booking
 */
export function isDateAvailable(
    date: Date,
    blockedDates: Date[],
    allowWeekends: boolean,
    minAdvanceHours: number,
    maxAdvanceDays: number
): { available: boolean; reason?: string } {
    const now = new Date();
    const targetDate = startOfDay(date);

    // Check if date is in the past
    if (isBefore(targetDate, startOfDay(now))) {
        return { available: false, reason: 'Date is in the past' };
    }

    // Check minimum advance booking time
    const minAdvanceDate = new Date(now.getTime() + minAdvanceHours * 60 * 60 * 1000);
    if (isBefore(date, minAdvanceDate)) {
        return { available: false, reason: `Minimum ${minAdvanceHours} hours advance booking required` };
    }

    // Check maximum advance booking time
    const maxAdvanceDate = addDays(now, maxAdvanceDays);
    if (isAfter(targetDate, maxAdvanceDate)) {
        return { available: false, reason: `Cannot book more than ${maxAdvanceDays} days in advance` };
    }

    // Check if weekends are allowed
    if (!allowWeekends && isWeekend(date)) {
        return { available: false, reason: 'Weekend bookings not allowed' };
    }

    // Check if date is blocked
    const isBlocked = blockedDates.some(blockedDate => {
        const blocked = startOfDay(new Date(blockedDate));
        return blocked.getTime() === targetDate.getTime();
    });

    if (isBlocked) {
        return { available: false, reason: 'Date is blocked' };
    }

    return { available: true };
}

/**
 * Format booking dates for display
 */
export function formatBookingDates(startDate: Date, endDate: Date, bookingType: 'daily' | 'weekly' | 'monthly'): string {
    const start = format(new Date(startDate), 'MMM dd, yyyy');
    const end = format(new Date(endDate), 'MMM dd, yyyy');

    if (bookingType === 'daily') {
        return start;
    }

    return `${start} - ${end}`;
}

/**
 * Check if there's a booking conflict
 */
export function hasBookingConflict(
    newStart: Date,
    newEnd: Date,
    existingBookings: Array<{ startDate: Date; endDate: Date }>
): boolean {
    return existingBookings.some(booking => {
        const existingStart = new Date(booking.startDate);
        const existingEnd = new Date(booking.endDate);

        // Check if dates overlap
        return (
            (newStart >= existingStart && newStart <= existingEnd) ||
            (newEnd >= existingStart && newEnd <= existingEnd) ||
            (newStart <= existingStart && newEnd >= existingEnd)
        );
    });
}

/**
 * Get the number of days between two dates
 */
export function getDaysBetween(startDate: Date, endDate: Date): number {
    const start = startOfDay(new Date(startDate));
    const end = startOfDay(new Date(endDate));
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

/**
 * Parse price string and return numeric value in kobo (for Paystack)
 */
export function parsePriceToKobo(priceString: string): number {
    const numericValue = parseInt(priceString.replace(/[^0-9]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue * 100; // Convert to kobo
}
