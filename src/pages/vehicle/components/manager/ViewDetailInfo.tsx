import { useParams, useLocation } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import {
  useGetCustomerById,
  useGetVehicleList,
  useGetVehicleBrand,
} from "@/services/manager/queries";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import Loading from "@/components/Loading";
import CustomerInfoBox from "./customerManagement/CustomerInfoBox";
import type { CustomerTable } from "../libs/table-types";
import type { Customer } from "@/types/models/account";
import type { Vehicle } from "@/types/models/vehicle";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./vehicleManagement/vehicleTable/columns";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import type { AccountRole } from "@/types/enums/role";

export default function ViewDetailInfo() {
  const { auth } = useAuth();
  const { customerId } = useParams<{ customerId: string }>();
  const userId = customerId ? b64DecodeUnicode(customerId) : null;
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

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    status: "",
    brandId: "",
  });

  const {
    data: apiResponse,
    isLoading,
    isFetching,
  } = useGetVehicleList({
    customerId: userId || "",
    page,
    pageSize,
    licensePlate: searchValue || undefined,
    status: filters.status || undefined,
    brandId: filters.brandId ? Number(filters.brandId) : undefined,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
  });

  const { data: brandList } = useGetVehicleBrand();

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };
  const columns = getColumns(
    handleFilterChange,
    filters,
    brandList ?? [],
    auth.user?.role as AccountRole,
  );

  if (!user) return <Loading />;
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      {auth.user?.role === "STAFF" && (
        <DynamicBreadcrumbs
          pathTitles={{
            vehicles: "Customer & Vehicles Management",
            [customerId ?? ""]: "Customer Detail",
          }}
        />
      )}
      {auth.user?.role === "ADMIN" && (
        <DynamicBreadcrumbs
          pathTitles={{
            vehicles: "Customer & Vehicles Management",
            [customerId ?? ""]: "Detailed Information",
          }}
        />
      )}
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
              data={apiResponse?.data ?? []}
              pageIndex={(apiResponse?.page ?? 1) - 1}
              pageSize={apiResponse?.pageSize ?? 10}
              totalPage={apiResponse?.totalPages ?? 1}
              isLoading={isLoading}
              isFetching={isFetching}
              onPageChange={(newPage) => setPage(newPage + 1)}
              onPageSizeChange={setPageSize}
              manualPagination
              onSearchChange={setSearchValue}
              searchPlaceholder="License Plate"
              isSearch
              manualSearch
              manualSorting
              sorting={sorting}
              onSortingChange={setSorting}
            />
          </CardContent>
        </Card>
      </MainContentLayout>
    </div>
  );
}
