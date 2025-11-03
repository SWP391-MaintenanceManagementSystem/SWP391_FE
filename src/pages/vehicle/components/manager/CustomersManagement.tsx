import { useState } from "react";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { getColumns } from "./customerManagement/table/columns";
import { DataTable } from "@/components/table/DataTable";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import type { CustomerTable } from "../libs/table-types";
import { useGetAccountList } from "@/services/manager/queries";
import ChartCustomerStat from "./customerManagement/ChartCustomerStat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import type { AccountRole } from "@/types/enums/role";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminVehiclesManagement() {
  const { auth } = useAuth();
  // pagination + search + sort
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    status: "",
    isPremium: undefined as boolean | undefined,
  });

  const { data, isLoading, isFetching } = useGetAccountList({
    page,
    pageSize,
    email: searchValue || undefined,
    status: filters.status || undefined,
    isPremium: filters.isPremium,
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
        address:
          profile && "address" in profile ? (profile.address ?? "") : " ",
      },
    };
  });

  const handleFilterChange = (
    field: string,
    value: string | boolean | undefined,
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };
  const columns = getColumns(
    handleFilterChange,
    filters,
    auth.user?.role as AccountRole,
  );

  return (
    <div className="w-full h-[calc(100vh-32px)] ">
      <DynamicBreadcrumbs
        pathTitles={{ vehicles: "Customers & Vehicle Management" }}
      />
      <MainContentLayout
        className={clsx(
          "grid grid-cols-1 gap-8 pt-4",
          auth.user?.role === "ADMIN" && "lg:grid-cols-[auto_1fr]",
        )}
      >
        {auth.user?.role === "ADMIN" && <ChartCustomerStat />}

        <Card className=" w-full h-full grid grid-rows-[auto_1fr] min-h-[600px]">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold font-inter text-gray-text-header">
              Customers List
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: pageSize }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex space-x-4 items-center animate-pulse pl-8"
                  >
                    <Skeleton className="h-6 w-[90%] rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <DataTable<CustomerTable, unknown>
                columns={columns as ColumnDef<CustomerTable, unknown>[]}
                data={customers}
                pageIndex={(data?.page ?? 1) - 1}
                pageSize={data?.pageSize ?? 10}
                totalPage={data?.totalPages ?? 1}
                isLoading={isLoading}
                isFetching={isFetching}
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
            )}
          </CardContent>
        </Card>
      </MainContentLayout>
    </div>
  );
}
