import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IResource {
    title: string;
    url: string;
    type: string;
    size?: string;
}

export interface ILesson {
    _id?: mongoose.Types.ObjectId;
    title: string;
    duration: string;
    videoUrl?: string;
    isFree: boolean;
    resources: IResource[];
}

export interface IModule {
    _id?: mongoose.Types.ObjectId;
    title: string;
    lessons: ILesson[];
}

export interface IProgram extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    category: string;
    duration?: string;
    weeks: number;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    curriculum: string[];
    modules: IModule[];
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
    introVideoUrl?: string;
    introThumbnailUrl?: string;
}

const ResourceSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, default: 'pdf' },
    size: { type: String }
});

const LessonSchema = new Schema({
    title: { type: String, required: true },
    duration: { type: String, required: true }, // e.g. "10:00"
    videoUrl: { type: String }, // optional if not yet uploaded
    isFree: { type: Boolean, default: false }, // for preview
    resources: [ResourceSchema]
});

const ModuleSchema = new Schema({
    title: { type: String, required: true },
    lessons: [LessonSchema]
});

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
                'fullstack',
                'mobile-dev',
                'data-analytics',
                'data-science',
                'cyber-security',
                'digital-marketing',
                'video-editing',
                'graphics-design',
                'product-design',
                'wordpress',
                'ai-ml',
                'devops',
                'robotics',
                'digital-literacy',
                'networking',
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
        curriculum: [ // Key topics/summary for landing page
            {
                type: String,
            },
        ],
        modules: [ModuleSchema], // Detailed course content
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
            required: false, // Optional for now
            default: 0,
            min: 0,
        },
        introVideoUrl: {
            type: String,
            trim: true,
        },
        introThumbnailUrl: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const Program: Model<IProgram> =
    mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);

export default Program;
