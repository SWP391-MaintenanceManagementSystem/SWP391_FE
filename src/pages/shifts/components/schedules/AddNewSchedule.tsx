import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import "animate.css";
import ScheduleCalendar from "./ScheduleCalendar";
import { useWorkSchedule } from "@/services/shift/hooks/useWorkSchedule";

export default function AddNewSchedulePage() {
  const { addForm, handleAddSchedule, isAddingPending } = useWorkSchedule();

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          shifts: "Work Shifts Management",
          addNewSchedule: "Create New Schedule",
        }}
      />
      <MainContentLayout className="h-full">
        <ScheduleCalendar
          form={addForm}
          onConfirm={handleAddSchedule}
          isPending={isAddingPending}
        />
      </MainContentLayout>
    </div>
  );
}
