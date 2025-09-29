import { useState } from "react";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { columns, type CustomerTable } from "./table/columns";
import { DataTable } from "@/components/table/DataTable";
import { useGetCustomerList } from "@/services/manager/queries";
import { DEFAULT_PAGE_SIZE } from "@/utils/constant";

export default function AdminVehiclesManagement() {
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Query customer list
  const { data, isLoading } = useGetCustomerList(page, pageSize);
  // console.log("loading:", isLoading, "data:", data);

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
          onSearchChange={() => {
            console.log("search value changed");
          }}
        />
      </MainContentLayout>
    </div>
  );
}
