import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
    children: React.ReactNode;
    welcomeTitle: string;
    welcomeSubtitle: string;
    formTitle: string;
    formSubtitle: string;
    sideIllustration?: string;
}

export default function AuthLayout({
    children,
    welcomeTitle,
    welcomeSubtitle,
    formTitle,
    formSubtitle,
    sideIllustration = "/images/auth_illustration.png",
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Welcome Banner */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#0D55BA] flex-col items-center justify-center p-12 text-white relative overflow-hidden">
                {/* Logo */}
                <div className="absolute top-12 left-12">
                    <Link href="/">
                        <div className="bg-white p-2 rounded-xl shadow-lg">
                            <Image
                                src="/images/icehub.png"
                                alt="ICE HUB"
                                width={40}
                                height={40}
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Content */}
                <div className="max-w-md text-center z-10">
                    <h2 className="text-4xl font-bold mb-4">{welcomeTitle}</h2>
                    <p className="text-blue-100 text-lg mb-12">{welcomeSubtitle}</p>

                    <div className="relative w-full aspect-square max-w-sm mx-auto">
                        <Image
                            src={sideIllustration}
                            alt="Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <div className="text-center lg:text-left mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{formTitle}</h1>
                        <p className="text-gray-500">{formSubtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
