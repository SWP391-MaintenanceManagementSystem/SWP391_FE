import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";

export default function StaffsManagementPage() {
  return (
    <div>
      <DynamicBreadcrumbs
        pathTitles={{ employees: "Employees Management", staffs: "Staffs" }}
        hasPage={false}
      />
      <MainContentLayout>
        <h1>Staffs Management</h1>
      </MainContentLayout>
    </div>
  );
}
