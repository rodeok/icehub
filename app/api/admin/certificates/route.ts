import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import User from '@/models/User';
import Program from '@/models/Program';
import crypto from 'crypto';

export async function GET() {
    try {
        await connectDB();
        const certificates = await Certificate.find()
            .populate('userId', 'fullName email')
            .populate('programId', 'name weeks')
            .sort({ createdAt: -1 });

        return NextResponse.json(certificates);
    } catch (error: any) {
        console.error('Error fetching certificates:', error);
        return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { userId, programId, completionDate } = body;

        if (!userId || !programId) {
            return NextResponse.json({ error: 'User ID and Program ID are required' }, { status: 400 });
        }

        // Check if certificate already exists for this user and program
        const existing = await Certificate.findOne({ userId, programId });
        if (existing) {
            return NextResponse.json({ error: 'Certificate already issued for this program' }, { status: 400 });
        }

        // Generate QR code data (usually a link to a verification page)
        const verificationToken = crypto.randomBytes(16).toString('hex');
        const qrCodeData = `https://icehub.icedt.org/verify/${verificationToken}`;

        // Generate certificate number
        const year = new Date().getFullYear();
        const random = crypto.randomBytes(3).toString('hex').toUpperCase();
        const certificateNumber = `ICEHUB-${year}-${random}`;

        const newCertificate = new Certificate({
            userId,
            programId,
            certificateNumber,
            completionDate: completionDate || new Date(),
            qrCodeData,
            status: 'issued'
        });

        await newCertificate.save();

        return NextResponse.json(newCertificate);
    } catch (error: any) {
        console.error('Error issuing certificate:', error);
        return NextResponse.json({ error: 'Failed to issue certificate' }, { status: 500 });
    }
}
