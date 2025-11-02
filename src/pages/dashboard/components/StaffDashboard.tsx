import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useAuth } from "@/contexts/AuthContext";
import TotalCard from "./card/TotalCard";
import {
  BadgeCheck,
  NotebookPenIcon,
  TriangleAlert,
  Users,
} from "lucide-react";
import WeeklyWorkSchedule from "./card/WorkScheduleCard";
import TodayBookingCard from "./card/TodayBookingCard";

export default function StaffDashboard() {
  const { auth } = useAuth();
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          dashboard: `Welcome back, ${auth?.user?.profile?.firstName} ${auth?.user?.profile?.lastName}`,
        }}
      />
      <MainContentLayout className="grid grid-cols-1 grid-rows-[auto_1fr] md:gap-6 gap-4 overflow-y-auto">
        <div className="grid grid-cols-4 gap-3">
          <TotalCard title="Total Customers" icon={Users} numberValue={30} />
          <TotalCard
            title="Total Booking"
            icon={NotebookPenIcon}
            numberValue={30}
          />
          <TotalCard
            title="Completed Booking"
            icon={BadgeCheck}
            numberValue={30}
          />
          <TotalCard
            title="Pending Booking"
            icon={TriangleAlert}
            numberValue={30}
          />
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-6">
          <div>
            <TodayBookingCard />
          </div>
          <WeeklyWorkSchedule employeeId={auth?.user?.id ?? ""} />
        </div>
      </MainContentLayout>
    </div>
  );
}
