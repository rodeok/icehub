import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgress extends Document {
    userId: mongoose.Types.ObjectId;
    programId: mongoose.Types.ObjectId;
    lessonId: string; // Using string as lessons might be subdocuments
    moduleId: string; // Using string
    status: 'not_started' | 'in_progress' | 'completed';
    secondsWatched: number;
    lastWatchedAt: Date;
    completedAt?: Date;
}

const ProgressSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        programId: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
            required: true,
        },
        lessonId: {
            type: String,
            required: true,
        },
        moduleId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['not_started', 'in_progress', 'completed'],
            default: 'not_started',
        },
        secondsWatched: {
            type: Number,
            default: 0,
        },
        lastWatchedAt: {
            type: Date,
            default: Date.now,
        },
        completedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to quickly find progress for a specific user and lesson
ProgressSchema.index({ userId: 1, programId: 1, lessonId: 1 }, { unique: true });

// Prevent model recompilation in development
if (process.env.NODE_ENV !== 'production') {
    delete mongoose.models.Progress;
}

const Progress: Model<IProgress> =
    mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);

export default Progress;
