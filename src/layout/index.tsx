import { AppSidebar } from "@/components/side-bar/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-full md:gap-6 ">
        <AppSidebar />
        <SidebarTrigger
          size={"icon"}
          className="md:hidden fixed top-3 right-5 h-8 w-8"
        />
        <main className="mt-4 w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
