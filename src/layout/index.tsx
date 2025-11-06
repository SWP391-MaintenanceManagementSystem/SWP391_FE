import { AppSidebar } from "@/components/side-bar/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NotificationsPopover from "@/pages/notification/components/NotificationPopover";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const isNotificationPage = location.pathname.startsWith("/notification");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-full md:gap-6">
        <AppSidebar />
        <SidebarTrigger
          size={"icon"}
          className="md:hidden fixed top-3 right-5 h-8 w-8"
        />
        <main className="mt-4 w-full mx-auto relative">
          {!isNotificationPage && <NotificationsPopover />}
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
