import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import "animate.css";
import ScheduleCalendar from "./ScheduleCalendar";

export default function AddNewSchedulePage() {
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          shifts: "Work Shifts Management",
          addNewSchedule: "Create New Schedule",
        }}
      />
      <MainContentLayout className="h-full">
        <ScheduleCalendar />
      </MainContentLayout>
    </div>
  );
}
