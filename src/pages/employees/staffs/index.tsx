import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useState } from "react";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import { useGetStaffs } from "@/services/manager/queries";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./components/table/columns";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import TotalBox from "../components/TotalBox";
import StaffBlackIcon from "@/assets/staff-black.png";
import StaffWhiteIcon from "@/assets/staff-white.png";

export default function StaffsManagementPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({ status: "" });
  const { data, isLoading } = useGetStaffs({
    page,
    pageSize,
    email: searchValue || undefined,
    status: filters.status || undefined,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
  });
  const accounts = data?.data ?? [];

  const staffs: EmployeeTable[] = accounts
    .filter((acc) => acc.role === "STAFF")
    .map((acc) => ({
      id: acc.id,
      email: acc.email,
      phone: acc.phone ?? "",
      status: acc.status,
      role: acc.role,
      profile: acc.profile
        ? { firstName: acc.profile.firstName, lastName: acc.profile.lastName }
        : undefined,
    }));

  const handleStatusChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const columns = getColumns(handleStatusChange, filters);

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{ employees: "Employees Management", staffs: "Staffs" }}
        hasPage={false}
      />
      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
        <TotalBox
          title="Staffs"
          iconDark={StaffBlackIcon}
          iconLight={StaffWhiteIcon}
          total={data?.total ?? 0}
        />

        <div className=" w-full h-full flex flex-col bg-slate-100 rounded-3xl px-6 py-8 shadow-sm min-h-[600px]">
          <h3 className="text-2xl font-semibold mb-4 text-gray-text-header">
            Staffs List
          </h3>
          <DataTable<EmployeeTable, unknown>
            columns={columns as ColumnDef<EmployeeTable, unknown>[]}
            data={staffs}
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
