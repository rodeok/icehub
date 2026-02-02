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
    sideIllustration = "/images/authtable.png",
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Welcome Banner */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#0D55BA] flex-col items-center justify-center p-12 text-white relative overflow-hidden">
                {/* Content Container */}
                <div className="max-w-md w-full flex flex-col items-center text-center z-10">
                    {/* Logo - Centered */}
                    <div className="mb-8">
                        <Link href="/">
                            <div className="bg-white p-3 rounded-xl shadow-lg inline-block">
                                <Image
                                    src="/images/icehub.png"
                                    alt="ICE HUB"
                                    width={48}
                                    height={48}
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    <h2 className="text-4xl font-bold mb-4 tracking-tight leading-snug !text-white">
                        {welcomeTitle}
                    </h2>
                    <p className="!text-white text-lg mb-12 max-w-[300px] leading-relaxed opacity-90">
                        {welcomeSubtitle}
                    </p>

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

                {/* Decorative Elements - matching the image's subtle waves/circles */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[100px]" />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{formTitle}</h1>
                        <p className="text-gray-500 font-medium">{formSubtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
