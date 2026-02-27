import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscriber extends Document {
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const SubscriberSchema: Schema<ISubscriber> = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
    },
    {
        timestamps: true,
    }
);

const Subscriber: Model<ISubscriber> =
    mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;
