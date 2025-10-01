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

export default function ViewDetailInfo() {
  const { id } = useParams<{ id: string }>();
  const userId = id ? b64DecodeUnicode(id) : null;
  const { data: user } = useGetCustomerById(userId ?? "");

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
    apiResponse?.data?.map((item: Vehicle) => ({
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

  if (!user) return <Loading />;
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customer & Vehicles Management",
          [id ?? ""]: "Detailed Information",
        }}
      />
      <MainContentLayout className="lg:flex-row flex-col gap-12 ">
        <CustomerInfoBox
          customer={customer}
          currentPage={currentPage}
          currentPageSize={currentPageSize}
        />
        <div className="w-full h-full flex flex-col bg-slate-100 rounded-3xl px-6 py-8 shadow-sm min-h-[600px]">
          <h3 className="text-2xl font-semibold mb-4 text-gray-text-header">
            Customer Vehicle List
          </h3>
          <DataTable<Vehicle, unknown>
            columns={columns as ColumnDef<Vehicle, unknown>[]}
            data={vehiclesList}
            isLoading={isLoading}
            manualPagination={false}
          />
        </div>
      </MainContentLayout>
    </div>
  );
}
