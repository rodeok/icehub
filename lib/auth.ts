import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from './mongodb';
import User from '@/models/User';
import { comparePassword } from './bcrypt';
import { generateUniqueUserCode } from '@/utils/generateCode';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter your email and password');
                }

                await connectDB();

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
                    image: null,
                };
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
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).uniqueCode = token.uniqueCode as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);
