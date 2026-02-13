import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
    _id: mongoose.Types.ObjectId;
    userId?: mongoose.Types.ObjectId | string;
    programId?: mongoose.Types.ObjectId;
    reference: string;
    amount: number;
    currency: string;
    status: 'pending' | 'success' | 'failed';
    paymentMethod: string;
    paystackResponse: any;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        programId: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
            required: false, // Optional - can be null if user pays before selecting program
        },
        reference: {
            type: String,
            required: [true, 'Payment reference is required'],
            unique: true,
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: 0,
        },
        currency: {
            type: String,
            default: 'NGN',
        },
        status: {
            type: String,
            enum: ['pending', 'success', 'failed'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            default: 'paystack',
        },
        paystackResponse: {
            type: Schema.Types.Mixed,
        },
        metadata: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const Payment: Model<IPayment> =
    mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
