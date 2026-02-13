import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import Program from '@/models/Program';
import { getAuthSession } from '@/lib/auth';
import QRCode from 'qrcode';

export async function GET() {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const certificatesList = await Certificate.find({ userId: session.user.id })
            .populate('programId')
            .sort({ issueDate: -1 });

        // Filter out certificates where programId is null (e.g. program was deleted)
        const certificates = certificatesList.filter(cert => cert.programId);

        return NextResponse.json({ certificates }, { status: 200 });
    } catch (error: any) {
        console.error('Get certificates error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to get certificates' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const body = await req.json();
        const { programId, completionDate } = body;

        if (!programId || !completionDate) {
            return NextResponse.json(
                { error: 'Please provide programId and completionDate' },
                { status: 400 }
            );
        }

        // Check if program exists
        const program = await Program.findById(programId);
        if (!program) {
            return NextResponse.json(
                { error: 'Program not found' },
                { status: 404 }
            );
        }

        // Check if certificate already exists
        const existingCertificate = await Certificate.findOne({
            userId: session.user.id,
            programId,
        });

        if (existingCertificate) {
            return NextResponse.json(
                { error: 'Certificate already exists for this program' },
                { status: 409 }
            );
        }

        // Generate certificate number
        const year = new Date().getFullYear();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        const certificateNumber = `ICEHUB-${year}-${random}`;

        // Generate QR code
        const qrData = `${process.env.NEXT_PUBLIC_ICEHUB_URL}/verify/${certificateNumber}`;
        const qrCodeData = await QRCode.toDataURL(qrData);

        // Create certificate
        const certificate = await Certificate.create({
            userId: session.user.id,
            programId,
            certificateNumber,
            qrCodeData,
            completionDate: new Date(completionDate),
        });

        const populatedCertificate = await Certificate.findById(
            certificate._id
        ).populate('programId');

        return NextResponse.json(
            {
                message: 'Certificate generated successfully',
                certificate: populatedCertificate,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create certificate error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create certificate' },
            { status: 500 }
        );
    }
}
