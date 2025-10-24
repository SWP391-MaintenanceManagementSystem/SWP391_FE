import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import "animate.css";
import ScheduleCalendar from "./ScheduleCalendar";
import { useWorkSchedule } from "@/services/shift/hooks/useWorkSchedule";
import { useGetEmployeesQuery } from "@/services/shift/queries";
import type { AddWorkScheduleFormData } from "../../libs/schema";

export default function AddNewSchedulePage() {
  const { data: employeesList } = useGetEmployeesQuery();
  const { addForm, handleAddSchedule, isAddingPending, isAddSuccess } =
    useWorkSchedule();

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
          onConfirm={(data: AddWorkScheduleFormData) =>
            handleAddSchedule(data, employeesList ?? [])
          }
          isPending={isAddingPending}
          isSuccess={isAddSuccess}
        />
      </MainContentLayout>
    </div>
  );
}
