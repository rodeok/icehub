import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITimeSlot {
    start: string; // e.g., "09:00"
    end: string;   // e.g., "17:00"
    label: string; // e.g., "Full Day (9 AM - 5 PM)"
}

export interface IAvailability extends Document {
    _id: mongoose.Types.ObjectId;
    planTitle: string;
    planId?: string;

    // Capacity Management
    maxDailyCapacity: number;
    maxWeeklyCapacity: number;
    maxMonthlyCapacity: number;

    // Time Slots
    availableTimeSlots: ITimeSlot[];

    // Blocked Dates
    blockedDates: Date[];

    // Custom Rules
    allowWeekends: boolean;
    minAdvanceBookingHours: number; // Minimum hours in advance for booking
    maxAdvanceBookingDays: number;  // Maximum days in advance for booking

    // Operating Hours
    operatingHours: {
        start: string; // e.g., "08:00"
        end: string;   // e.g., "18:00"
    };

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TimeSlotSchema = new Schema({
    start: { type: String, required: true },
    end: { type: String, required: true },
    label: { type: String, required: true },
}, { _id: false });

const AvailabilitySchema: Schema = new Schema(
    {
        planTitle: {
            type: String,
            required: [true, 'Plan title is required'],
            unique: true,
        },
        planId: {
            type: String,
        },

        // Capacity Management
        maxDailyCapacity: {
            type: Number,
            required: [true, 'Daily capacity is required'],
            min: 1,
            default: 10,
        },
        maxWeeklyCapacity: {
            type: Number,
            required: [true, 'Weekly capacity is required'],
            min: 1,
            default: 10,
        },
        maxMonthlyCapacity: {
            type: Number,
            required: [true, 'Monthly capacity is required'],
            min: 1,
            default: 10,
        },

        // Time Slots
        availableTimeSlots: {
            type: [TimeSlotSchema],
            default: [
                { start: '09:00', end: '12:00', label: 'Morning (9 AM - 12 PM)' },
                { start: '12:00', end: '17:00', label: 'Afternoon (12 PM - 5 PM)' },
                { start: '09:00', end: '17:00', label: 'Full Day (9 AM - 5 PM)' },
            ],
        },

        // Blocked Dates
        blockedDates: {
            type: [Date],
            default: [],
        },

        // Custom Rules
        allowWeekends: {
            type: Boolean,
            default: true,
        },
        minAdvanceBookingHours: {
            type: Number,
            default: 2, // 2 hours minimum
        },
        maxAdvanceBookingDays: {
            type: Number,
            default: 90, // 90 days maximum
        },

        // Operating Hours
        operatingHours: {
            start: { type: String, default: '08:00' },
            end: { type: String, default: '18:00' },
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient queries
AvailabilitySchema.index({ planTitle: 1 });

const Availability: Model<IAvailability> =
    mongoose.models.Availability || mongoose.model<IAvailability>('Availability', AvailabilitySchema);

export default Availability;
