import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Program from '@/models/Program';

export async function POST(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await req.json();
        const { programId, customAmount, paymentType } = body;

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

        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecretKey) {
            return NextResponse.json(
                { error: 'Paystack configuration missing. Please add PAYSTACK_SECRET_KEY to environment variables.' },
                { status: 500 }
            );
        }

        // Use custom amount if provided, otherwise use program price or default price
        const DEFAULT_PRICE = 450000; // Fixed price when no program selected
        const amountToCharge = customAmount || (program ? program.price : DEFAULT_PRICE);

        // Initialize Paystack transaction
        const paystackData = {
            email: session.user.email,
            amount: amountToCharge * 100, // Convert to kobo
            currency: 'NGN',
            metadata: {
                programId: program?._id?.toString() || null,
                programName: program?.name || 'To be selected',
                userId: session.user.id,
                userName: session.user.name,
                paymentType: paymentType || 'full',
                customAmount: customAmount || null,
            },
            callback_url: `${process.env.NEXT_PUBLIC_ICEHUB_URL}/dashboard/payment?verify=true`,
        };

        // Initialize Paystack transaction with retry logic and longer timeout
        let response;
        let retries = 3;
        let lastError = null;

        while (retries > 0) {
            try {
                response = await fetch('https://api.paystack.co/transaction/initialize', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${paystackSecretKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paystackData),
                    // Increase timeout to 30s for slow connections
                    signal: AbortSignal.timeout(30000)
                });
                // If we get here without an exception, the connection succeeded
                break;
            } catch (fetchError: any) {
                lastError = fetchError;
                console.warn(`Paystack API connection attempt failed. Retries left: ${retries - 1}. Error:`, fetchError.message);
                retries--;
                if (retries === 0) {
                    console.error('All Paystack initialization attempts failed:', fetchError);
                    throw new Error(
                        'Unable to connect to Paystack after multiple attempts. Please check your internet connection or try again later. ' +
                        'If this persists, contact support.'
                    );
                }
                // Wait 1.5 seconds before retrying
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }

        if (!response) {
            throw new Error('Failed to establish connection to Paystack payment gateway');
        }

        const data = await response.json();

        if (!data.status) {
            return NextResponse.json(
                { error: data.message || 'Failed to initialize payment' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            authorizationUrl: data.data.authorization_url,
            reference: data.data.reference,
            accessCode: data.data.access_code,
        });
    } catch (error: any) {
        console.error('Payment initialization error:', error);

        // Provide more user-friendly error messages
        let errorMessage = 'Failed to initialize payment';

        if (error.message?.includes('Unable to connect to Paystack')) {
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
