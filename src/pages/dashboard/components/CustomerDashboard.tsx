import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCustomerDashboardData } from "@/services/dashboard/queries/customer";
import type { CustomerDashboardData } from "@/types/models/dashboard";
import OverviewCardCustomer from "./card/OverviewCardCustomer";



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
      <MainContentLayout className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 overflow-y-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4">
          <div className="grid lg:grid-rows-[auto_1fr]  gap-4">
            <OverviewCardCustomer
              data={data as CustomerDashboardData}
              isLoading={isLoading}
            />
          </div>
         
        </div>
      </MainContentLayout>
    </div>
  );
}
