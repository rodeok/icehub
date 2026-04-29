import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Program from '@/models/Program';
import { checkRateLimit } from '@/lib/rate-limit';
import { validateRequest, paymentInitializeSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
    console.log('>>> [API/PAYMENTS/INITIALIZE] Request started');
    try {
        const body = await req.json();
        console.log('>>> [API/PAYMENTS/INITIALIZE] Request body:', body);
        // 1. Rate Limiting (10 requests per 30 minutes)
        const rateLimitResponse = await checkRateLimit(req, {
            endpoint: 'payment-init',
            limit: 10,
            windowMs: 30 * 60 * 1000
        });
        if (rateLimitResponse) return rateLimitResponse;

        const session = await getAuthSession();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // 2. Input Validation & Sanitization
        const { success, data: validatedData, errorResponse } = await validateRequest(paymentInitializeSchema, body);

        if (!success) {
            return NextResponse.json(errorResponse, { status: 400 });
        }

        const { programId, customAmount, paymentType } = validatedData as any;

        await connectDB();

        // Program ID is now optional - users can pay first, then choose program
        let program = null;
        if (programId) {
            program = await Program.findById(programId);
            if (!program) {
                return NextResponse.json(
                    { error: 'Program not found' },
                    { status: 404 }
                );
            }
        }

        const flwSecretKey = process.env.FLW_SECRET_KEY;
        if (!flwSecretKey) {
            return NextResponse.json(
                { error: 'Flutterwave configuration missing. Please add FLW_SECRET_KEY to environment variables.' },
                { status: 500 }
            );
        }

        // Use custom amount if provided, otherwise use program price or default price
        const DEFAULT_PRICE = 450000; // Fixed price when no program selected
        const amountToCharge = customAmount || (program ? program.price : DEFAULT_PRICE);
        const tx_ref = `ICE-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

        // Initialize Flutterwave transaction
        const flwData = {
            tx_ref,
            amount: amountToCharge, // Flutterwave uses standard units
            currency: 'NGN',
            redirect_url: `${process.env.NEXT_PUBLIC_ICEHUB_URL}/dashboard/payment?verify=true`,
            customer: {
                email: session.user.email,
                name: session.user.name,
            },
            meta: {
                programId: program?._id?.toString() || '',
                programName: program?.name || 'To be selected',
                userId: session.user.id,
                userName: session.user.name,
                paymentType: paymentType || 'full',
                customAmount: customAmount?.toString() || '',
            },
            customizations: {
                title: 'ICEHub Payment',
                description: program ? `Payment for ${program.name}` : 'Program Enrollment Payment',
                logo: 'https://icehub.ng/logo.png',
            },
        };

        // Initialize Flutterwave transaction with retry logic and longer timeout
        let response;
        let retries = 3;

        while (retries > 0) {
            try {
                response = await fetch('https://api.flutterwave.com/v3/payments', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${flwSecretKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(flwData),
                    // Increase timeout to 30s for slow connections
                    signal: AbortSignal.timeout(30000)
                });
                // If we get here without an exception, the connection succeeded
                break;
            } catch (fetchError: any) {
                console.warn(`Flutterwave API connection attempt failed. Retries left: ${retries - 1}. Error:`, fetchError.message);
                retries--;
                if (retries === 0) {
                    console.error('All Flutterwave initialization attempts failed:', fetchError);
                    throw new Error(
                        'Unable to connect to Flutterwave after multiple attempts. Please check your internet connection or try again later. ' +
                        'If this persists, contact support.'
                    );
                }
                // Wait 1.5 seconds before retrying
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }

        if (!response) {
            throw new Error('Failed to establish connection to Flutterwave payment gateway');
        }

        const flwResponse = await response.json();
        console.log('>>> [API/PAYMENTS/INITIALIZE] Flutterwave response status:', response.status);
        console.log('>>> [API/PAYMENTS/INITIALIZE] Flutterwave response body:', flwResponse);

        if (flwResponse.status !== 'success') {
            return NextResponse.json(
                { error: flwResponse.message || 'Failed to initialize payment' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            authorizationUrl: flwResponse.data.link,
            reference: tx_ref,
        });
    } catch (error: any) {
        console.error('Payment initialization error:', error);

        // Provide more user-friendly error messages
        let errorMessage = 'Failed to initialize payment';

        if (error.message?.includes('Unable to connect to Flutterwave')) {
            errorMessage = error.message;
        } else if (error.code === 'UND_ERR_CONNECT_TIMEOUT' || error.message?.includes('timeout')) {
            errorMessage = 'Connection to payment gateway timed out. Please check your internet connection and try again.';
        } else if (error.message) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
