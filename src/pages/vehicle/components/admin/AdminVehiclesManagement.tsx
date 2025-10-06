import { useState } from "react";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { getColumns } from "./customerManagement/table/columns";
import { DataTable } from "@/components/table/DataTable";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import type { CustomerTable } from "../libs/table-types";
import { useGetAccountList } from "@/services/manager/queries";
import ChartCustomerStat from ".././admin/customerManagement/ChartCustomerStat";

export default function AdminVehiclesManagement() {
  // pagination + search + sort
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    status: "",
    isPremium: "",
  });

  // gọi 1 hook duy nhất
  const { data, isLoading } = useGetAccountList({
    page,
    pageSize,
    email: searchValue || undefined,
    status: filters.status || undefined,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
    type: "CUSTOMER",
  });

  const accounts = data?.data ?? [];

  const customers: CustomerTable[] = accounts.map((acc) => {
    const profile = acc.profile;
    const isCustomerProfile =
      profile && "isPremium" in profile && profile.isPremium !== undefined;
    return {
      id: acc.id,
      email: acc.email,
      phone: acc.phone ?? "",
      status: acc.status,
      role: acc.role,
      profile: {
        firstName: profile && "firstName" in profile ? profile.firstName : "",
        lastName: profile && "lastName" in profile ? profile.lastName : "",
        isPremium: isCustomerProfile ? profile.isPremium === true : false,
        address: profile && "address" in profile ? (profile.address ?? "") : "",
      },
    };
  });

  const handleFilterChange = (field: string, value: string | undefined) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const columns = getColumns(handleFilterChange, filters);

  return (
    <div className="w-full h-[calc(100vh-32px)] ">
      <DynamicBreadcrumbs
        pathTitles={{ vehicles: "Customers & Vehicle Management" }}
      />
      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
        <ChartCustomerStat />
        <div className=" w-full h-full flex flex-col bg-slate-100 rounded-3xl px-6 py-8 shadow-sm min-h-[600px]">
          <h3 className="text-2xl font-semibold font-inter mb-4 text-gray-text-header">
            Customers List
          </h3>
          <DataTable<CustomerTable, unknown>
            columns={columns as ColumnDef<CustomerTable, unknown>[]}
            data={customers}
            pageIndex={(data?.page ?? 1) - 1}
            pageSize={data?.pageSize ?? 10}
            totalPage={data?.totalPages ?? 1}
            isLoading={isLoading}
            onPageChange={(newPage) => setPage(newPage + 1)}
            onPageSizeChange={setPageSize}
            onSearchChange={setSearchValue}
            searchPlaceholder="email"
            sorting={sorting}
            onSortingChange={setSorting}
            manualPagination
            manualSorting
            manualSearch
            isSearch
          />
        </div>
      </MainContentLayout>
    </div>
  );
}
