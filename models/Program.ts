import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgram extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    category: string;
    duration?: string;
    weeks: number;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    curriculum: string[];
    imageUrl?: string;
    totalModules: number;
    videoLessons: number;
    resourcesCount: number;
    videoUrls: string[];
    resourceUrls: string[];
    isActive: boolean;
    enrolledCount: number;
    createdAt: Date;
    updatedAt: Date;
    price: number;
}

const ProgramSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Program name is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Program description is required'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: [
                'frontend',
                'backend',
                'mobile-dev',
                'data-analytics',
                'cyber-security',
                'graphics-design',
                'product-design',
                'digital-literacy',
                'next-gen',
                'skit',
            ],
        },
        duration: {
            type: String,
            required: false,
        },
        weeks: {
            type: Number,
            required: [true, 'Number of weeks is required'],
            min: 1,
        },
        skillLevel: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        curriculum: [
            {
                type: String,
            },
        ],
        imageUrl: {
            type: String,
        },
        totalModules: {
            type: Number,
            default: 0,
        },
        videoLessons: {
            type: Number,
            default: 0,
        },
        resourcesCount: {
            type: Number,
            default: 0,
        },
        videoUrls: [
            {
                type: String,
            },
        ],
        resourceUrls: [
            {
                type: String,
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        enrolledCount: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

// In development, the model might be cached with an old schema.
// This forces Mongoose to use the updated schema.
if (mongoose.models.Program) {
    delete (mongoose.models as any).Program;
}

const Program: Model<IProgram> = mongoose.model<IProgram>('Program', ProgramSchema);

export default Program;
