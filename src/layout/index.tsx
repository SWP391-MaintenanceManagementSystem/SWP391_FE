import { AppSidebar } from "@/components/side-bar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-full gap-6">
        <AppSidebar />
        <main className="mt-4 w-full">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
