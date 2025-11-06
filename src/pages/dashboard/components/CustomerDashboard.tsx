import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCustomerDashboardData } from "@/services/dashboard/queries/customer";
import type { CustomerDashboardData } from "@/types/models/dashboard";
import OverviewCardCustomer from "./card/OverviewCardCustomer";
import { CustomerBookingStatusChart } from "./chart/BookingStatusChart";
import { CustomerBookingsByCenterChart } from "./chart/BookingCenterChart";
import OverviewCardSpending from "./card/OverviewCardSpending";
import SpendingSummaryBarChart from "./chart/SpendingSummaryBarChart";
import RecentBookingTable from "./table/RecentBookingTable";



export default function CustomerDashboard() {
  const { auth } = useAuth();
  const { data, isLoading } = useGetCustomerDashboardData();

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          dashboard: `👋 Welcome back, ${auth?.user?.profile?.firstName} ${auth?.user?.profile?.lastName}`,
        }}
      />
       <MainContentLayout className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-6">
          <OverviewCardCustomer
            data={data as CustomerDashboardData}
            isLoading={isLoading}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomerBookingStatusChart data={data as CustomerDashboardData} />
            <CustomerBookingsByCenterChart data={data as CustomerDashboardData} />
          </div>
          <OverviewCardSpending data = {data as CustomerDashboardData}  isLoading={isLoading}/>
          <SpendingSummaryBarChart/>
          <RecentBookingTable/>

        </div>
      </MainContentLayout>
    </div>
  );
}
