import DashNav from '@/components/DashNav';
import SideDash from '@/components/SideDash';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <SideDash />
            {/* Main Content Area - pushed right by sidebar width (w-64) */}
            <div className="ml-64 flex min-h-screen w-full flex-col bg-[#F7F9FC]">
                <DashNav />
                {/* Content with top padding to account for fixed DashNav (h-16) */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
