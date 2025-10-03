import { useState } from "react";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { columns } from "./customerManagement/table/columns";

import { DataTable } from "@/components/table/DataTable";
import {
  useGetCustomerList,
  useSearchCustomersByEmail,
  useGetSortedCustomersList,
} from "@/services/manager/queries";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import type { CustomerTable } from "./customerManagement/type";

export default function AdminVehiclesManagement() {
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // Query customer list and search list
  const customerListQuery = useGetCustomerList(page, pageSize);
  const searchQuery = useSearchCustomersByEmail(searchValue);
  const sortedQuery = useGetSortedCustomersList({
    page,
    pageSize,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
  });

  const data = searchValue
    ? searchQuery.data
    : sorting.length > 0
      ? sortedQuery.data
      : customerListQuery.data;
  const isLoading = searchValue
    ? searchQuery.isLoading
    : sorting.length > 0
      ? sortedQuery.isLoading
      : customerListQuery.isLoading;

  const accounts = data?.data ?? [];

  const customers: CustomerTable[] =
    accounts?.map((acc) => {
      const profile = acc.profile;

      const isCustomerProfile =
        profile && "isPremium" in profile && profile.isPremium !== undefined;
      // console.log("Customer Profile:", profile);
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
            profile && "address" in profile ? (profile.address ?? "") : "",
        },
      };
    }) ?? [];

  return (
    <div className="w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customers & Vehicles Management",
        }}
      />
      <MainContentLayout>
        <DataTable<CustomerTable, unknown>
          columns={columns as ColumnDef<CustomerTable, unknown>[]}
          searchValue="email"
          data={customers}
          pageIndex={(data?.page ?? 1) - 1}
          pageSize={data?.pageSize ?? 10}
          totalPage={data?.totalPages ?? 1}
          onPageChange={(newPage) => setPage(newPage + 1)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          isLoading={isLoading}
          onSearchChange={(value) => setSearchValue(value)}
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </MainContentLayout>
    </div>
  );
}
