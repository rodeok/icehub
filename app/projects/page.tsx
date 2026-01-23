import Navbar from "@/components/Navbar";

export default function ProjectsPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <main className="pt-24 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Projects</h1>
                <p className="text-lg text-gray-600">
                    Showcase of our student projects and success stories.
                </p>
            </main>
        </div>
    );
}
