import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useAuth } from "@/contexts/AuthContext";
import WeeklyWorkSchedule from "./card/WorkScheduleCard";
import TodayBookingCard from "./card/TodayBookingCard";
import BookingStatisticCard from "./card/BookingStatisticCard";
import { useGetStaffDashboardData } from "@/services/dashboard/queries/staff";
import type { StaffDashboardData } from "@/types/models/dashboard";
import { OverviewStaff } from "./card/OverviewCard";

export default function StaffDashboard() {
  const { auth } = useAuth();
  const { data, isLoading } = useGetStaffDashboardData();

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
            <OverviewStaff
              data={data as StaffDashboardData}
              isLoading={isLoading}
            />
            <TodayBookingCard />
          </div>
          <WeeklyWorkSchedule employeeId={auth?.user?.id ?? ""} />
        </div>
        <BookingStatisticCard data={data as StaffDashboardData} />
      </MainContentLayout>
    </div>
  );
}
