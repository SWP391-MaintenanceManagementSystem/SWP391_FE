import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useAuth } from "@/contexts/AuthContext";
import CurrentBookingCard from "./card/CurrentBookingCard";
import WeeklyWorkSchedule from "./card/WorkScheduleCard";
import BookingStatisticPieChart from "./chart/BookingStatisticPieChart";

export default function TechnicianDashboard() {
  const { auth } = useAuth();
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter space-y-6 p-4">
      <DynamicBreadcrumbs
        pathTitles={{
          dashboard: `👋 Welcome back, ${auth?.user?.profile?.firstName} ${auth?.user?.profile?.lastName}`,
        }}
      />

      <MainContentLayout>
        {/* Current Booking - full width */}
        <div className="w-full">
          <CurrentBookingCard />
        </div>

        {/* Two columns: Work Schedule + Booking Statistic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <WeeklyWorkSchedule employeeId={auth?.user?.id ?? ""} />
          <BookingStatisticPieChart />
        </div>
      </MainContentLayout>
    </div>
  );
}
