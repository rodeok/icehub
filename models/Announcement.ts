import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnnouncement extends Document {
    title: string;
    message: string;
    targetType: 'all' | 'program';
    targetId: mongoose.Types.ObjectId | null;
    targetName: string;
    status: 'PUBLISHED' | 'SCHEDULED';
    sentBy: string;
    views: number;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
}

const AnnouncementSchema: Schema<IAnnouncement> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        message: {
            type: String,
            required: [true, 'Message content is required'],
        },
        targetType: {
            type: String,
            enum: ['all', 'program'],
            default: 'all',
        },
        targetId: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
            default: null,
        },
        targetName: {
            type: String,
            default: 'All Students',
        },
        status: {
            type: String,
            enum: ['PUBLISHED', 'SCHEDULED'],
            default: 'PUBLISHED',
        },
        sentBy: {
            type: String,
            default: 'Admin',
        },
        views: {
            type: Number,
            default: 0,
        },
        clicks: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Announcement: Model<IAnnouncement> =
    mongoose.models.Announcement ||
    mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);

export default Announcement;
