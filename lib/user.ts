import { cache } from 'react';
import { getAuthSession } from './auth';
import connectDB from './mongodb';
import User from '@/models/User';
import Program from '@/models/Program'; // Import Program model to register schema
import { generateUniqueUserCode } from '@/utils/generateCode';

export const getCachedUser = cache(async () => {
    const session = await getAuthSession();
    if (!session?.user?.id) return null;

    try {
        await connectDB();
        let user = await User.findById(session.user.id).populate('enrolledPrograms').lean();

        if (!user) return null;

        // Self-healing: Ensure uniqueCode exists
        if (!user.uniqueCode) {
            const uniqueCode = await generateUniqueUserCode();
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { uniqueCode },
                { new: true }
            ).populate('enrolledPrograms').lean();
            return JSON.parse(JSON.stringify(updatedUser));
        }

        // Return a plain object (POJO)
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error('Error fetching cached user:', error);
        return null;
    }
});
