import Navbar from "@/components/Navbar";

export default function WorkspacePage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <main className="pt-24 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Workspace</h1>
                <p className="text-lg text-gray-600">
                    State-of-the-art co-working space and facilities.
                </p>
            </main>
        </div>
    );
}
