"use client";
import { useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Explore from "@/components/Explore";
import Skit from "@/components/Skit";
import Choose from "@/components/Choose";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { init } from 'ragged-chat-sdk'

export default function Home() {
    useEffect(() => {
        init({
            subdomain: 'icehub',
            apiUrl: 'https://ragflowdb.onrender.com/api'
        });
    }, []);
    return (
        <div className="relative">
            <Hero />
            <Explore />
            <Skit />
            <Choose />
            <Faq />
            <Testimonials />
            <Partners />
            <Footer />
        </div>
    );
}
