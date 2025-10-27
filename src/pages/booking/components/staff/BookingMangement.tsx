import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { DataTable } from "@/components/table/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { getColumns } from "./table/columns";
import { useState } from "react";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import type { BookingStaffTable } from "@/types/models/booking-with-detail";
import { BookingStatus } from "@/types/enums/bookingStatus";
import useBooking from "@/services/booking/hooks/useStaffBooking";
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

export default function BookingManagement() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    status: "" as "" | BookingStatus,
    isPremium: undefined as boolean | undefined,
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { bookingData, isLoading } = useBooking({
    page,
    pageSize,
    search: searchValue || undefined,
    status: filters.status || undefined,
    isPremium: filters.isPremium,
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
      <DynamicBreadcrumbs pathTitles={{ booking: "Booking Management" }} />
      <MainContentLayout className="grid grid-cols-1 gap-8 pt-4">
        <Card className=" w-full h-full grid min-h-[600px]">
          <CardContent>
            <DataTable<BookingStaffTable, unknown>
              columns={columns as ColumnDef<BookingStaffTable, unknown>[]}
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
              sorting={sorting}
              headerActions={
                <div
                  className={clsx(
                    "grid  lg:justify-end items-end gap-2 w-full grid-cols-1",
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
