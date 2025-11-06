import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./columns";
import { type Booking } from "@/types/models/booking";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import useBooking from "@/services/booking/hooks/useBooking";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RecentBookingTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebounce(searchValue, 300);

  const sortFieldMapper: Record<string, string> = {
    bookingId: "createdAt",
    center: "centerId",
    serviceCenter: "centerId",
    total: "createdAt",
    totalCost: "createdAt",
    status: "status",
    date: "bookingDate",
    bookingDate: "bookingDate",
    createdAt: "createdAt",
  };

  const sortByField = sortFieldMapper[sorting[0]?.id ?? ""] ?? "createdAt";

  const { bookingData, isLoading } = useBooking({
    page,
    pageSize,
    search: debouncedSearch,
    sortBy: sortByField,
    orderBy: sorting[0]?.desc ? "desc" : "asc",
    isActive: true,
  });

  const bookings = bookingData?.data ?? [];
  const columns = getColumns();

  return (
    <Card className="w-full h-[calc(100vh-32px)] shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">
          Recent Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable<Booking, unknown>
          columns={columns as ColumnDef<Booking, unknown>[]}
          data={bookings}
          pageIndex={page - 1}
          pageSize={pageSize}
          totalPage={bookingData?.totalPages ?? 1}
          isLoading={isLoading}
          onPageChange={(newPage) => setPage(newPage + 1)}
          onPageSizeChange={setPageSize}
          sorting={sorting}
          onSortingChange={setSorting}
          manualPagination
          manualSorting
          isSearch
          manualSearch
          onSearchChange={setSearchValue}
          searchPlaceholder="Booking ID"
        />
      </CardContent>
    </Card>
  );
}
