import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICertificate extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    programId: mongoose.Types.ObjectId;
    certificateNumber: string;
    issueDate: Date;
    qrCodeData: string;
    status: 'issued' | 'revoked';
    completionDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const CertificateSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
        programId: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
            required: [true, 'Program ID is required'],
        },
        certificateNumber: {
            type: String,
            required: [true, 'Certificate number is required'],
            unique: true,
            default: () => {
                const year = new Date().getFullYear();
                const random = Math.random().toString(36).substring(2, 8).toUpperCase();
                return `ICEHUB-${year}-${random}`;
            }
        },
        issueDate: {
            type: Date,
            default: Date.now,
        },
        qrCodeData: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['issued', 'revoked'],
            default: 'issued',
        },
        completionDate: {
            type: Date,
            required: [true, 'Completion date is required'],
        },
    },
    {
        timestamps: true,
    }
);


// In development, the model might be cached with an old schema.
if (mongoose.models.Certificate) {
    delete (mongoose.models as any).Certificate;
}

const Certificate: Model<ICertificate> = mongoose.model<ICertificate>('Certificate', CertificateSchema);

export default Certificate;
