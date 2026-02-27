import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Basic email validation
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        await connectDB();

        // Check if the subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json({ error: 'Email is already subscribed' }, { status: 409 });
        }

        // Create a new subscriber
        await Subscriber.create({ email });

        return NextResponse.json({ success: true, message: 'Subscribed successfully!' }, { status: 201 });
    } catch (error: any) {
        console.error('Subscription error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
