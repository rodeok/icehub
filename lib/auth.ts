import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from './mongodb';
import User from '@/models/User';
import Instructor from '@/models/Instructor';
import { comparePassword } from './bcrypt';
import { generateUniqueUserCode } from '@/utils/generateCode';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
                isTutor: { label: 'Is Tutor', type: 'text' } // Using text to pass boolean as string
            },
            async authorize(credentials) {
                try {
                    await connectDB();

                    // TRUTH: If isTutor passed, it's a tutor login
                    if (credentials?.isTutor === 'true') {
                        if (!credentials?.username || !credentials?.password) {
                            throw new Error('Please enter your username and password');
                        }

                        const instructor = await Instructor.findOne({ username: credentials.username });
                        if (!instructor) {
                            throw new Error('No instructor found with this username');
                        }

                        if (!instructor.password) {
                            throw new Error('No password set for this instructor');
                        }

                        const isPasswordValid = await comparePassword(
                            credentials.password,
                            instructor.password
                        );

                        if (!isPasswordValid) {
                            throw new Error('Invalid password');
                        }

                        if (!instructor.isActive) {
                            throw new Error('Your instructor account has been deactivated');
                        }

                        return {
                            id: instructor._id.toString(),
                            name: instructor.fullName,
                            email: instructor.email,
                            role: 'tutor'
                        };
                    } else {
                        // Standard user login
                        if (!credentials?.email || !credentials?.password) {
                            throw new Error('Please enter your email and password');
                        }

                        const user = await User.findOne({ email: credentials.email });

                        if (!user) {
                            throw new Error('No user found with this email');
                        }

                        const isPasswordValid = await comparePassword(
                            credentials.password,
                            user.password
                        );

                        if (!isPasswordValid) {
                            throw new Error('Invalid password');
                        }

                        if (!user.isActive) {
                            throw new Error('Your account has been deactivated');
                        }

                        // Auto-generate code for existing users if missing (Fix: Use findOneAndUpdate for persistence)
                        if (!user.uniqueCode) {
                            const uniqueCode = await generateUniqueUserCode();
                            await User.findByIdAndUpdate(user._id, { uniqueCode });
                            user.uniqueCode = uniqueCode;
                        }

                        return {
                            id: user._id.toString(),
                            email: user.email,
                            name: user.fullName,
                            uniqueCode: user.uniqueCode,
                            role: 'user',
                            image: null,
                        };
                    }
                } catch (error) {
                    console.error("Authentication Error:", error);
                    throw error;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.uniqueCode = (user as any).uniqueCode;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).uniqueCode = token.uniqueCode as string;
                (session.user as any).role = token.role as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);
