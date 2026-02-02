import DashNav from '@/components/DashNav';
import SideDash from '@/components/SideDash';
import { getCachedUser } from '@/lib/user';
import { SidebarProvider } from '@/context/SidebarContext';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCachedUser();
    const uniqueCode = user?.uniqueCode || '';

    return (
        <SidebarProvider>
            <div className="flex">
                <SideDash />
                {/* Main Content Area - pushed right by sidebar width (w-64) on larger screens */}
                <div className="flex-1 flex min-h-screen flex-col bg-[#F7F9FC] transition-all duration-300 sm:ml-64">
                    <DashNav uniqueCode={uniqueCode} />
                    {/* Content with top padding to account for fixed DashNav (h-16) */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
