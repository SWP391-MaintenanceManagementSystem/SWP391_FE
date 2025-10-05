import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import type { EmployeeTable } from "../libs/table-types";
import { DataTable } from "@/components/table/DataTable";
import TotalBox from "../components/TotalBox";
import { useGetTechnicians } from "@/services/manager/queries";
import { useState } from "react";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import { getColumns } from "./table/comlums";
import TechnicianBlack from "@/assets/technician-black.png";
import TechnicianWhite from "@/assets/technician-white.png";
import { useMemo } from "react";

export default function TechniciansManagementPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({ status: "" });
  const { data, isLoading, isFetching } = useGetTechnicians({
    page,
    pageSize,
    email: searchValue || undefined,
    status: filters.status || undefined,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
  });

  console.log("Fetching:", isFetching);

  const technicians = useMemo(() => {
    const accounts = data?.data ?? [];
    return accounts
      .filter((acc) => acc.role === "TECHNICIAN")
      .filter((acc) => (filters.status ? acc.status === filters.status : true))
      .map((acc) => ({
        id: acc.id,
        email: acc.email,
        phone: acc.phone ?? "",
        status: acc.status || undefined,
        role: acc.role,
        profile: acc.profile
          ? { firstName: acc.profile.firstName, lastName: acc.profile.lastName }
          : undefined,
      }));
  }, [data, filters]);

  const handleStatusChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const columns = getColumns(handleStatusChange, filters);
  console.log(filters);

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        hasPage={false}
        pathTitles={{
          employees: "Employees Management",
          technicians: "Technicians",
        }}
      />

      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
        <TotalBox
          title="Technicians"
          iconDark={TechnicianBlack}
          iconLight={TechnicianWhite}
          total={data?.total ?? 0}
        />

        <div className=" w-full h-full flex flex-col bg-slate-100 rounded-3xl px-6 py-8 shadow-sm min-h-[600px]">
          <h3 className="text-2xl font-semibold mb-4 text-gray-text-header">
            Technicians List
          </h3>
          <DataTable<EmployeeTable, unknown>
            columns={columns as ColumnDef<EmployeeTable, unknown>[]}
            data={technicians}
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
        </div>
      </MainContentLayout>
    </div>
  );
}
