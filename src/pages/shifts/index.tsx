import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";

export default function WorkShiftsManagementPage() {
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          shifts: "Work Shift Management",
        }}
      />
      <MainContentLayout>
        <h1>Work shift</h1>
      </MainContentLayout>
    </div>
  );
}
