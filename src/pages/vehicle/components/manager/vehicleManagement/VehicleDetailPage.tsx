import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import MainContentLayout from "@/components/MainContentLayout";
import VehicleInfoBox from "./VehicleInfoBox";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/table/DataTable";
import useBookingHistory from "@/services/booking/hooks/useBookingHistory";
import type { BookingTable } from "@/types/models/booking-with-detail";
import type { BookingStatus } from "@/types/enums/bookingStatus";
import { Button } from "@/components/ui/button";
import { CalendarRange, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Calendar04 from "@/components/calendar-04";
import dayjs from "dayjs";
import type { DateRange } from "react-day-picker";
import clsx from "clsx";
import { getColumns } from "./bookingHistoryTable/columns";

export default function VehicleDetailPage() {
  const { customerId, vehicleId } = useParams<{
    customerId: string;
    vehicleId: string;
  }>();
  const decodedVehicleId = vehicleId ? b64DecodeUnicode(vehicleId) : null;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    status: "" as "" | BookingStatus,
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { historyData, isLoading } = useBookingHistory({
    page,
    pageSize,
    status: filters.status || undefined,
    vehicleId: decodedVehicleId || "",
    fromDate: dateRange?.from
      ? dayjs(dateRange.from).format("YYYY-MM-DD")
      : undefined,
    toDate: dateRange?.to
      ? dayjs(dateRange.to).format("YYYY-MM-DD")
      : undefined,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
  });
  const handleFilterChange = (
    field: string,
    value: string | boolean | undefined,
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const columns = getColumns(handleFilterChange, filters);
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customer & Vehicle Management",
          [customerId ?? ""]: "Customer Detail",
          [vehicleId ?? ""]: "Vehicle Detail",
        }}
      />
      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 pt-4">
        <VehicleInfoBox vehicleId={decodedVehicleId || ""} />
        <Card className=" w-full h-full grid gap-2 grid-rows-[auto_1fr] min-h-[600px]">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold font-inter text-gray-text-header">
              History Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable<BookingTable, unknown>
              columns={columns as ColumnDef<BookingTable, unknown>[]}
              data={historyData?.data ?? []}
              pageIndex={(historyData?.page ?? 1) - 1}
              pageSize={historyData?.pageSize ?? 10}
              totalPage={historyData?.totalPages ?? 1}
              isLoading={isLoading}
              manualPagination
              onPageChange={(newPage) => setPage(newPage + 1)}
              onPageSizeChange={setPageSize}
              manualSorting
              onSortingChange={setSorting}
              sorting={sorting}
              headerActions={
                <div
                  className={clsx(
                    "grid lg:justify-end items-end gap-2 w-full grid-cols-1",
                    dateRange?.from
                      ? "md:grid-cols-[auto_auto]"
                      : "md:grid-cols-[auto]",
                  )}
                >
                  {dateRange?.from && (
                    <Button
                      variant="ghost"
                      onClick={() => setDateRange(undefined)}
                      className="text-muted-foreground hover:text-foreground text-[12px] justify-self-end"
                    >
                      <X size={10} />
                      Reset filter
                    </Button>
                  )}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="secondary"
                        className=" justify-self-end w-full lg:w-auto"
                      >
                        <CalendarRange className="w-4 h-4 mr-2" />
                        {dateRange?.from
                          ? dateRange.to
                            ? dayjs(dateRange.from).isSame(dateRange.to, "day")
                              ? dayjs(dateRange.from).format("DD MMM")
                              : `${dayjs(dateRange.from).format("DD MMM")} - ${dayjs(dateRange.to).format("DD MMM")}`
                            : dayjs(dateRange.from).format("DD MMM")
                          : "Filter by date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar04
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              }
            />
          </CardContent>
        </Card>
      </MainContentLayout>
    </div>
  );
}
