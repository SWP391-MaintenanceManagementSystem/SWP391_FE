import MainContentLayout from "@/components/MainContentLayout";
import CurrentBookingCard from "./card/CurrentBookingCard";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useAuth } from "@/contexts/AuthContext";
import TechnicianBookingStatisticCard from "./chart/BookingStatisticPieChart";
import TechnicianWorkSchedule from "./card/TechnicianWorkSchedule";
import { InventoryStatusCard } from "./card/InventoryStatusCard";

import { useTranslation } from "react-i18next";

export default function TechnicianDashboard() {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const userName = `${auth?.user?.profile?.firstName ?? ""} ${auth?.user?.profile?.lastName ?? ""}`.trim();

  return (
    <div className="w-full min-h-[calc(100vh-32px)] font-inter p-3 space-y-4">
      <DynamicBreadcrumbs
        pathTitles={{
          dashboard: `👋 ${t("dashboard.welcome_back", { name: userName })}`,
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
