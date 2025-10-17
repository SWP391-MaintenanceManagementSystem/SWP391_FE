import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DataTable } from "@/components/table/DataTable";
import { useGetShiftList } from "@/services/shift/queries";
import { useState } from "react";
import { type ColumnDef, type SortingState } from "@tanstack/react-table";
import type { Shift } from "@/types/models/shift";
import { useGetServiceCenterList } from "@/services/manager/queries";
import { getColumns } from "./table/columns";
import { CalendarClock } from "lucide-react";

export default function ShiftsManagementPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    status: "",
    centerId: "",
  });
  const { data: centerListData } = useGetServiceCenterList();
  const centerList = centerListData ?? [];
  const {
    data: apiData,
    isLoading,
    isFetching,
  } = useGetShiftList({
    page,
    pageSize,
    name: searchValue || undefined,
    status: filters.status || undefined,
    centerId: filters.centerId || undefined,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
  });
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };
  const columns = getColumns(handleFilterChange, filters, centerList);
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CalendarClock className="w-4 h-4 mr-2" />
          Total: {apiData?.total ?? 0} shifts
        </CardTitle>
        <CardDescription>
          Overview of all defined work shifts across service centers.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <DataTable<Shift, unknown>
          data={apiData?.data ?? []}
          columns={columns as ColumnDef<Shift, unknown>[]}
          isLoading={isLoading}
          isFetching={isFetching}
          pageIndex={(apiData?.page ?? 1) - 1}
          pageSize={apiData?.pageSize ?? 10}
          totalPage={apiData?.totalPages ?? 1}
          manualPagination
          onPageChange={(newPage) => setPage(newPage + 1)}
          onPageSizeChange={setPageSize}
          manualSearch
          onSearchChange={setSearchValue}
          searchPlaceholder="shift name"
          isSearch
          manualSorting
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </CardContent>
    </Card>
  );
}
