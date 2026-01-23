import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogsPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <main className="pt-24 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Blogs & Activities</h1>
                <p className="text-lg text-gray-600">
                    Latest news, updates, and activities from Ice Hub.
                </p>
            </main>
            <Footer />
        </div>
    );
}
