import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useMemo, useState } from "react";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import { useGetAccountList } from "@/services/manager/queries";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./table/columns";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import TotalBox from "../components/TotalBox";
import StaffBlackIcon from "@/assets/staff-black.png";
import StaffWhiteIcon from "@/assets/staff-white.png";
import { Card } from "@/components/ui/card";
import { useGetServiceCenterList } from "@/services/manager/queries";
import { Skeleton } from "@/components/ui/skeleton";

export default function StaffsManagementPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({ status: "", centerId: "" });
  const { data, isLoading, isFetching } = useGetAccountList({
    page,
    pageSize,
    email: searchValue || undefined,
    status: filters.status || undefined,
    centerId: filters.centerId || undefined,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
    type: "STAFF",
  });

  const { data: centerListData } = useGetServiceCenterList();
  const centerList = centerListData ?? [];

  const staffs = useMemo(() => {
    const accounts = data?.data ?? [];
    return accounts
      .filter((acc) => acc.role === "STAFF")
      .map((acc) => ({
        id: acc.id,
        email: acc.email,
        phone: acc.phone ?? "",
        status: acc.status || undefined,
        role: acc.role,
        profile: acc.profile
          ? {
              firstName: acc.profile.firstName,
              lastName: acc.profile.lastName,
            }
          : undefined,
        workCenter:
          "workCenter" in acc && acc.workCenter ? acc.workCenter : undefined,
      }));
  }, [data]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const columns = getColumns(handleFilterChange, filters, centerList);

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{ employees: "Employees Management", staffs: "Staffs" }}
        hasPage={false}
      />
      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 pt-4">
        <TotalBox
          title="Staffs"
          iconDark={StaffBlackIcon}
          iconLight={StaffWhiteIcon}
          role={"STAFF"}
          page={page}
          pageSize={pageSize}
        />

        <Card className=" w-full h-full flex flex-col px-6 py-8 min-h-[600px]">
          <h3 className="text-2xl font-semibold mb-4 text-gray-text-header">
            Staffs List
          </h3>
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
          ) : (
            <DataTable<EmployeeTable, unknown>
              columns={columns as ColumnDef<EmployeeTable, unknown>[]}
              data={staffs}
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
        </Card>
      </MainContentLayout>
    </div>
  );
}
