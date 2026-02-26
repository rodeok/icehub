import mongoose from 'mongoose';
import Blog from '../models/Blog';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function backfillSlugs() {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('No MONGODB_URI found.');
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB.');

        const blogs = await Blog.find({ $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }] });
        console.log(`Found ${blogs.length} blogs without a slug.`);

        for (const blog of blogs) {
            let baseSlug = blog.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            let slug = baseSlug;
            let counter = 1;
            while (await Blog.findOne({ slug, _id: { $ne: blog._id } })) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }

            blog.slug = slug;
            await blog.save();
            console.log(`Updated blog ID ${blog._id} with slug: ${slug}`);
        }

        console.log('Backfill complete.');
        process.exit(0);
    } catch (err) {
        console.error('Error during backfill:', err);
        process.exit(1);
    }
}

backfillSlugs();
