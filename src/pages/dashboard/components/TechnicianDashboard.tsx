import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useGetTechnicianDashboardData } from "@/services/dashboard/queries/technician";
import CurrentBookingCard from "./card/CurrentBookingCard";
import WeeklyWorkSchedule from "./card/WorkScheduleCard";
import BookingStatisticCard from "./card/BookingStatisticCard";

export default function TechnicianDashboard() {
  const { auth } = useAuth();
    const { data, isLoading } = useGetTechnicianDashboardData();
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
<DynamicBreadcrumbs
            pathTitles={{
              dashboard: `👋 Welcome back, ${auth?.user?.profile?.firstName} ${auth?.user?.profile?.lastName}`,
            }}
          />
          <MainContentLayout>
            <CurrentBookingCard/>
             <WeeklyWorkSchedule employeeId={auth?.user?.id ?? ""} />
          </MainContentLayout>
    </div>
     
  )
}
