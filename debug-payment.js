import connectDB from './lib/mongodb.js';
import Payment from './models/Payment.js';
import Program from './models/Program.js';
import User from './models/User.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function debug() {
    try {
        await connectDB();
        console.log('Connected to DB');

        // Get a user to test with - maybe from the session if I knew the ID, but let's try to find any active user
        const testUser = await User.findOne({ enrolledPrograms: { $exists: true, $not: { $size: 0 } } });

        if (!testUser) {
            console.log('No user with enrolled programs found');
            return;
        }

        console.log('Testing with User:', testUser._id, testUser.email);

        // Mimic API logic
        const payments = await Payment.find({ userId: testUser._id })
            .populate('programId', 'name price')
            .sort({ createdAt: -1 });

        console.log('Payments found:', payments.length);

        const user = await User.findById(testUser._id).populate(
            'enrolledPrograms',
            'name price _id'
        );

        console.log('User populated:', !!user);

        const successfulPayments = payments.filter(p => p.status === 'success');
        const totalPaid = Math.round(successfulPayments.reduce((sum, p) => sum + p.amount, 0));
        console.log('Total Paid:', totalPaid);

        const REGISTRATION_FEE = 10000;

        let totalFees = (user.enrolledPrograms || []).reduce(
            (sum, program) => {
                console.log('Program logic:', program?.name, program?.price);
                return sum + (program?.price || 0);
            },
            0
        );

        console.log('Total Fees (programs):', totalFees);

        if ((user.enrolledPrograms && user.enrolledPrograms.length > 0) || totalPaid > 0) {
            totalFees += REGISTRATION_FEE;
        }

        console.log('Total Fees (final):', totalFees);

        const outstandingBalance = Math.round(Math.max(totalFees - totalPaid, 0));
        console.log('Outstanding Balance:', outstandingBalance);

        process.exit(0);
    } catch (error) {
        console.error('Debug Error:', error);
        process.exit(1);
    }
}

debug();
