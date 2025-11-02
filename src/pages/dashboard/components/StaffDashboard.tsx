import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useAuth } from "@/contexts/AuthContext";
import TotalCard from "./card/TotalCard";
import { MessageCircleMoreIcon, Users } from "lucide-react";
import WeeklyWorkSchedule from "./card/WorkScheduleCard";
import TodayBookingCard from "./card/TodayBookingCard";
import BookingStatisticCard from "./card/BookingStatisticCard";

export default function StaffDashboard() {
  const { auth } = useAuth();
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
            <div className="grid grid-cols-2 gap-3">
              <TotalCard
                title="Total Customers"
                icon={Users}
                numberValue={30}
              />
              <TotalCard
                title="New Tickets"
                icon={MessageCircleMoreIcon}
                numberValue={30}
              />
            </div>
            <TodayBookingCard />
          </div>
          <WeeklyWorkSchedule employeeId={auth?.user?.id ?? ""} />
        </div>
        <BookingStatisticCard />
      </MainContentLayout>
    </div>
  );
}
