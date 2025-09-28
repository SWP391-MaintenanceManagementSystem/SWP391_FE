import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { columns, dummyData, type CustomerTable } from "./table/columns";
import { DataTable } from "./table/DataTable";

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
        <DataTable<CustomerTable, any>
          columns={columns}
          data={dummyData}
          searchValue="email"
          pageSize={12}
        />
      </MainContentLayout>
    </div>
  );
}
