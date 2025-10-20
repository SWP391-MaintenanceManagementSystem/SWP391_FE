import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/table/DataTable";
import { useGetWorkSchedulesList } from "@/services/shift/queries";
import type { WorkSchedule } from "@/types/models/shift";
import { useGetServiceCenterList } from "@/services/manager/queries";
import { getColumns } from "./table/columns";
import { Button } from "@/components/ui/button";
import { CalendarRange, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Calendar04 from "@/components/calendar-04";
import dayjs from "dayjs";
import type { DateRange } from "react-day-picker";

export default function WorkScheduleList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    centerId: "",
    shiftId: "",
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { data: centerListData } = useGetServiceCenterList();
  const centerList = centerListData ?? [];
  const {
    data: apiData,
    isLoading,
    isFetching,
  } = useGetWorkSchedulesList({
    page,
    pageSize,
    centerId: filters.centerId || undefined,
    shiftId: filters.shiftId || undefined,
    dateFrom: dateRange?.from
      ? dayjs(dateRange.from).format("YYYY-MM-DD")
      : undefined,
    dateTo: dateRange?.to
      ? dayjs(dateRange.to).format("YYYY-MM-DD")
      : undefined,

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
  const [openAddModal, setOpenAddModal] = useState(false);
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-xl">Employee Work Schedules</CardTitle>
        <CardDescription>
          Manage schedules and filter by date or service center.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <DataTable<WorkSchedule, unknown>
          data={apiData?.data ?? []}
          columns={columns as ColumnDef<WorkSchedule, unknown>[]}
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
          searchPlaceholder="employee name or email"
          isSearch
          manualSorting
          sorting={sorting}
          onSortingChange={setSorting}
          headerActions={
            <>
              {dateRange?.from && (
                <Button
                  variant="ghost"
                  onClick={() => setDateRange(undefined)}
                  className="text-muted-foreground hover:text-foreground text-[12px]"
                >
                  <X size={10} />
                  Reset filter
                </Button>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">
                    <CalendarRange className="w-4 h-4 mr-2" />
                    {dateRange?.from
                      ? dateRange.to
                        ? `${dayjs(dateRange.from).format("DD MMM")} - ${dayjs(dateRange.to).format("DD MMM")}`
                        : dayjs(dateRange.from).format("DD/MM/YYYY")
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
              <Button
                onClick={() => setOpenAddModal(true)}
                variant="outline"
                autoFocus={false}
              >
                Add New Schedule
                <Plus className="h-4 w-4 ml-2" />
              </Button>
            </>
          }
        />
      </CardContent>
    </Card>
  );
}
