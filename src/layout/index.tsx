import { AppSidebar } from "@/components/side-bar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="mt-4">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}