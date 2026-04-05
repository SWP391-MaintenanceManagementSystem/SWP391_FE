import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { RevenueChart } from "./chart/RevenueChart";

import { InventoryStatusCard } from "./card/InventoryStatusCard";
import { OverviewAdmin } from "./card/OverviewCard";
import { TrendingPurchaseCard } from "./card/TrendingCard";
import CenterBarChar from "./chart/CenterBarChart";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ dashboard: t("sidebar.titles.dashboard") }} />
      <MainContentLayout className="grid grid-cols-1 md:gap-6 gap-4 overflow-y-auto">
        <OverviewAdmin />
        <RevenueChart />
        <TrendingPurchaseCard />
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
          <InventoryStatusCard />
          <CenterBarChar />
        </div>
      </MainContentLayout>
    </div>
  );
}
