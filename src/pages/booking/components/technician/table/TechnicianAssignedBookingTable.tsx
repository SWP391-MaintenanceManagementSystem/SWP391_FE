import { useState, useCallback } from "react";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./columns";
import {
  defaultBookingFilter,
  type TechnicianBooking,
} from "@/types/models/booking";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import useTechnicianBooking from "@/services/booking/hooks/useTechnicianBooking";
import { useDebounce } from "@uidotdev/usehooks";
export default function TechnicianAssignedBookingTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState(defaultBookingFilter);
  const debouncedSearch = useDebounce(searchValue, 300);
  const handleFilterChange = useCallback(
    (field: string, value: string | boolean | undefined) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: value,
      }));
    },
    []
  );

  const { bookingData, isLoading } = useTechnicianBooking({
    ...filters,
    page,
    pageSize,
    search: debouncedSearch,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
  });

  const bookings = bookingData?.data;

  const columns = getColumns(handleFilterChange, filters);

  return (
    <div className="w-full h-[calc(100vh-32px)] ">
      <DataTable<TechnicianBooking, unknown>
        columns={columns as ColumnDef<TechnicianBooking, unknown>[]}
        data={bookings ?? []}
        pageIndex={page - 1}
        pageSize={pageSize}
        totalPage={bookingData?.totalPages ?? 1}
        isLoading={isLoading}
        onPageChange={(newPage) => setPage(newPage + 1)}
        onPageSizeChange={setPageSize}
        onSearchChange={setSearchValue}
        searchPlaceholder="Customer, License plate ..."
        sorting={sorting}
        onSortingChange={setSorting}
        manualPagination
        manualSorting
        manualSearch
        isSearch
      />
    </div>
  );
}
