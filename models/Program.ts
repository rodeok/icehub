import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgram extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    category: string;
    duration: string;
    price: number;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    curriculum: string[];
    imageUrl?: string;
    isActive: boolean;
    enrolledCount: number;
    createdAt: Date;
    updatedAt: Date;
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
            required: [true, 'Duration is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
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
        isActive: {
            type: Boolean,
            default: true,
        },
        enrolledCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Program: Model<IProgram> =
    mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);

export default Program;
