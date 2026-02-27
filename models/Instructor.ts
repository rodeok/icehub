import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInstructor extends Document {
    _id: mongoose.Types.ObjectId;
    fullName: string;
    username: string;
    password?: string;
    specialty: string;
    email: string;
    role: string;
    bio?: string;
    imageUrl?: string;
    cohorts: string[]; // Can be program IDs or category names
    rating: number;
    studentsCount: number;
    coursesCount: number;
    isActive: boolean;
    statusColor: string;
    createdAt: Date;
    updatedAt: Date;
}

const InstructorSchema: Schema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: false, // Optional temporarily to support existing instructors without passwords
        },
        specialty: {
            type: String,
            required: [true, 'Specialty is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            default: 'Instructor',
        },
        bio: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        cohorts: [
            {
                type: String,
            },
        ],
        rating: {
            type: Number,
            default: 5.0,
        },
        studentsCount: {
            type: Number,
            default: 0,
        },
        coursesCount: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        statusColor: {
            type: String,
            default: 'bg-green-500',
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
if (mongoose.models.Instructor) {
    delete (mongoose.models as any).Instructor;
}

const Instructor: Model<IInstructor> = mongoose.model<IInstructor>(
    'Instructor',
    InstructorSchema
);

export default Instructor;
