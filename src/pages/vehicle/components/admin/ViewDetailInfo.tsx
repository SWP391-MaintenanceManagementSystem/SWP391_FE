import { useParams, useLocation } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import {
  useGetCustomerById,
  useGetVehicleList,
} from "@/services/manager/queries";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import Loading from "@/components/Loading";
import CustomerInfoBox from "./customerManagement/CustomerInfoBox";
import type { CustomerTable } from "../libs/table-types";
import type { Customer } from "@/types/models/account";
import type { Vehicle } from "@/types/models/vehicle";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "./vehicleManagement/table/column";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ViewDetailInfo() {
  const { id } = useParams<{ id: string }>();
  const userId = id ? b64DecodeUnicode(id) : null;
  const { data: user } = useGetCustomerById(userId ?? "");

  const [sorting, setSorting] = useState<SortingState>([]);
  // const [filters, setFilters] = useState({
  //   status: "ACTIVE" | "INACTIVE",
  // });
  // const handleFilterChange = (field: string, value: string | undefined) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [field]: value,
  //   }));
  // };

  // const columns = getColumns(handleFilterChange, filters);

  const customer: CustomerTable = {
    id: user?.id ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    status: user?.status,
    role: user?.role,
    profile: {
      firstName: user?.profile?.firstName ?? "",
      lastName: user?.profile?.lastName ?? "",
      address: (user?.profile as Customer)?.address ?? "",
      isPremium: (user?.profile as Customer)?.isPremium ?? false,
    },
  };

  const location = useLocation() as {
    state?: { currentPage?: number; currentPageSize?: number };
  };

  const currentPage = location.state?.currentPage ?? 1;
  const currentPageSize = location.state?.currentPageSize ?? 10;

  const { data: apiResponse, isLoading } = useGetVehicleList(userId ?? "");

  const vehiclesList: Vehicle[] =
    apiResponse?.map((item: Vehicle) => ({
      id: item.id ?? "",
      vin: item.vin ?? "",
      model: item.model ?? "",
      brand: item.brand ?? "",
      licensePlate: item.licensePlate ?? "",
      customerId: item.customerId ?? "",
      status: item.status ?? "INACTIVE",
      deletedAt: item.deletedAt ?? null,
      lastService: item.lastService ?? null,
      createdAt: item.createdAt ?? "",
      updatedAt: item.updatedAt ?? "",
    })) ?? [];

  // const filteredVehicles = vehiclesList.filter(
  //   (v) => !filters.status || v.status === filters.status,
  // );

  // console.log(filteredVehicles);

  if (!user) return <Loading />;
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customer & Vehicles Management",
          [id ?? ""]: "Detailed Information",
        }}
      />
      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 pt-4">
        <CustomerInfoBox
          customer={customer}
          currentPage={currentPage}
          currentPageSize={currentPageSize}
        />
        <Card className=" w-full h-full grid grid-rows-[auto_1fr] min-h-[600px]">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold font-inter text-gray-text-header">
              Vehicles List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable<Vehicle, unknown>
              columns={columns as ColumnDef<Vehicle, unknown>[]}
              data={vehiclesList}
              searchPlaceholder="VIN, License Plate, Model"
              searchValue={["vin", "brand", "model", "licensePlate"]}
              isLoading={isLoading}
              manualPagination={false}
              isSearch={true}
              sorting={sorting}
              onSortingChange={setSorting}
            />
          </CardContent>
        </Card>
      </MainContentLayout>
    </div>
  );
}
