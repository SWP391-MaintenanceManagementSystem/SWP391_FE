import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";

export default function AdminVehiclesManagement() {
  return (
    <div className="w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customers & Vehicles Management",
        }}
      />
      <MainContentLayout>
        <h1 className="flex-1 justify-center items-center">
          Customer & Vehicles Management
        </h1>
      </MainContentLayout>
    </div>
  );
}
