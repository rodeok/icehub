import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Explore from "@/components/Explore";
import Skit from "@/components/Skit";
import Choose from "@/components/Choose";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <Hero />
      <Explore />
      <Skit />
      <Choose />
    </div>
  );
}
