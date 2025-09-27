import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { columns, data as dummyData, type CustomerTable } from "./columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<CustomerTable[]> {
  return [];
}

export default async function AdminVehiclesManagement() {
  const data = await getData();
  return (
    <div className="w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customers & Vehicles Management",
        }}
      />
      <MainContentLayout>
        <DataTable<CustomerTable, any> columns={columns} data={dummyData} />
      </MainContentLayout>
    </div>
  );
}
