import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import useBooking from "@/services/booking/hooks/useBooking";
import { DataTable } from "@/components/table/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getColumns } from "./table/columns";
import { useState } from "react";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import type { Booking } from "@/types/models/booking";
import { BookingStatus } from "@/types/enums/bookingStatus";

export default function BookingManagement() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    status: "" as "" | BookingStatus,
    centerId: "",
  });
  const { bookingData, isLoading } = useBooking({
    page,
    pageSize,
    search: searchValue || undefined,
    centerId: filters.centerId || undefined,
    status: filters.status || undefined,
    // sortBy: sorting[0]?.id ?? "createdAt",
    // orderBy: sorting[0]?.desc ? "desc" : "asc",
  });
  console.log(bookingData);
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const columns = getColumns(handleFilterChange, filters);
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ booking: "Booking Management" }} />
      <MainContentLayout className="grid grid-cols-1 gap-8 pt-4">
        <Card className=" w-full h-full grid grid-rows-[auto_1fr] min-h-[600px]">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold font-inter text-gray-text-header">
              Booking List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable<Booking, unknown>
              columns={columns as ColumnDef<Booking, unknown>[]}
              data={bookingData?.data ?? []}
              pageIndex={(bookingData?.page ?? 1) - 1}
              pageSize={bookingData?.pageSize ?? 10}
              totalPage={bookingData?.totalPages ?? 1}
              isLoading={isLoading}
              manualPagination
              onPageChange={(newPage) => setPage(newPage + 1)}
              onPageSizeChange={setPageSize}
              manualSearch
              isSearch
              onSearchChange={setSearchValue}
              searchPlaceholder="customer email, name, or license plate"
              manualSorting
              onSortingChange={setSorting}
            />
          </CardContent>
        </Card>
      </MainContentLayout>
    </div>
  );
}
