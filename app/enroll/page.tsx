"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const EnrollmentView = dynamic(() => import("../../components/EnrollmentView"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-white text-black bg-opacity-10">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
    ),
});

export default function EnrollmentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        }>
            <EnrollmentView />
        </Suspense>
    );
}
