import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
    _id: mongoose.Types.ObjectId;
    // User Details
    fullName: string;
    email: string;
    phone: string;

    // Plan Information
    planId?: string;
    planTitle: string;
    selectedPrice: string;

    // Booking Dates and Times
    bookingType: 'daily' | 'weekly' | 'monthly';
    startDate: Date;
    endDate: Date;
    timeSlot?: string; // e.g., "9:00 AM - 5:00 PM"

    // Payment Information
    paymentReference: string;
    amount: number;
    paymentStatus: 'pending' | 'successful' | 'failed';

    // Booking Status
    bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed';

    // Additional Information
    notes?: string;

    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
    {
        // User Details
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },

        // Plan Information
        planId: {
            type: String,
        },
        planTitle: {
            type: String,
            required: [true, 'Plan title is required'],
        },
        selectedPrice: {
            type: String,
            required: [true, 'Selected price is required'],
        },

        // Booking Dates and Times
        bookingType: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
            required: [true, 'Booking type is required'],
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
        },
        timeSlot: {
            type: String,
        },

        // Payment Information
        paymentReference: {
            type: String,
            required: [true, 'Payment reference is required'],
            unique: true,
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: 0,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'successful', 'failed'],
            default: 'pending',
        },

        // Booking Status
        bookingStatus: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
        },

        // Additional Information
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient queries
BookingSchema.index({ startDate: 1, endDate: 1 });
BookingSchema.index({ planTitle: 1, bookingStatus: 1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ paymentReference: 1 });

const Booking: Model<IBooking> =
    mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
