import MainContentLayout from "@/components/MainContentLayout";
import CurrentBookingCard from "./card/CurrentBookingCard";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useAuth } from "@/contexts/AuthContext";
import TechnicianBookingStatisticCard from "./chart/BookingStatisticPieChart";
import TechnicianWorkSchedule from "./card/TechnicianWorkSchedule";
import { InventoryStatusCard } from "./card/InventoryStatusCard";

export default function TechnicianDashboard() {
  const { auth } = useAuth();


  return (
    <div className="w-full min-h-[calc(100vh-32px)] font-inter p-3 space-y-4">
      <DynamicBreadcrumbs
        pathTitles={{
          dashboard: `👋 Welcome back, ${
            auth?.user?.profile?.firstName ?? ""
          } ${auth?.user?.profile?.lastName ?? ""}`,
        }}
      />

      <MainContentLayout className="space-y-4">
        <div>
          <CurrentBookingCard />
        </div>

        <div className="grid xl:grid-cols-[1fr_2fr] items-start  gap-4">
          <TechnicianBookingStatisticCard />
          <TechnicianWorkSchedule technicianId={auth?.user?.id ?? ""} />
        </div>

        <div>
          <InventoryStatusCard/> 
        </div>
      </MainContentLayout>
    </div>
  );
}
