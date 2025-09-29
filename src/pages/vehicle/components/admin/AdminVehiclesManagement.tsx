import { useState } from "react";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { columns, type CustomerTable } from "./table/columns";
import { DataTable } from "@/components/table/DataTable";
import { useGetCustomerList } from "@/services/manager/queries";
import type { Customer, Profile } from "@/types/models/account";

export default function AdminVehiclesManagement() {
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Query customer list
  const { data, isLoading } = useGetCustomerList(page, pageSize);
  // console.log("loading:", isLoading, "data:", data);

  // Type guard to check if profile is Customer
  function isCustomer(profile: Profile | undefined): profile is Customer {
    return !!profile && "is_premium" in profile;
  }

  const accounts = data?.data ?? [];

  // Map API data into CustomerTable for DataTable
  const customers: CustomerTable[] =
    accounts?.map((acc) => {
      const profile = acc.profile;
      return {
        firstName: profile?.firstName ?? "",
        lastName: profile?.lastName ?? "",
        email: acc.email,
        is_premium: isCustomer(profile) ? profile.is_premium : false,
        status: acc.status,
        address: isCustomer(profile) ? (profile.address ?? "") : "",
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
        <DataTable<CustomerTable, any>
          columns={columns}
          searchValue="email"
          data={customers}
          pageIndex={(data?.page ?? 1) - 1}
          pageSize={data?.pageSize ?? 12}
          totalPage={data?.totalPages ?? 1}
          onPageChange={(newPage) => setPage(newPage + 1)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          isLoading={isLoading}
        />
      </MainContentLayout>
    </div>
  );
}
