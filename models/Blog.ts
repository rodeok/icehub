import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
    tag: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    tagColor: string;
    imageUrl: string;
    slug: string;
    author?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
    {
        tag: {
            type: String,
            required: [true, 'Tag is required'],
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        excerpt: {
            type: String,
            required: [true, 'Excerpt is required'],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        date: {
            type: String,
            required: [true, 'Date is required'],
        },
        tagColor: {
            type: String,
            default: 'bg-blue-50 text-blue-600',
        },
        imageUrl: {
            type: String,
            default: '',
        },
        slug: {
            type: String,
            unique: true,
            sparse: true, // Allows nulls to not clash if generating slugs later
        },
    },
    {
        timestamps: true,
    }
);

const Blog: Model<IBlog> =
    mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
