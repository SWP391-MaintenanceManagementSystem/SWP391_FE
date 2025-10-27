import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/table/DataTable";
import {
  useGetWorkSchedulesList,
  useGetShiftsQuery,
} from "@/services/shift/queries";
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
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function WorkScheduleList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    centerId: "",
    shiftId: "",
    role: "",
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { data: centerListData } = useGetServiceCenterList();
  const centerList = centerListData ?? [];
  const { data: shiftsData } = useGetShiftsQuery();
  const shiftsList = shiftsData ?? [];
  const {
    data: apiData,
    isLoading,
    isFetching,
  } = useGetWorkSchedulesList({
    page,
    pageSize,
    centerId: filters.centerId || undefined,
    shiftId: filters.shiftId || undefined,
    search: searchValue,
    role: filters.role || undefined,
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
  const columns = getColumns(
    handleFilterChange,
    filters,
    centerList,
    shiftsList,
  );
  return (
    <Card className="w-full h-full">
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
            <div
              className={clsx(
                "grid justify-end items-end gap-2 w-full grid-cols-1",
                dateRange?.from
                  ? "md:grid-cols-[auto_auto_auto]"
                  : "md:grid-cols-[auto_auto]",
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
              <NavLink to="/shifts/addNewSchedule">
                <Button
                  variant="outline"
                  autoFocus={false}
                  className=" justify-self-end w-full lg:w-auto"
                >
                  New Schedule
                  <Plus className="h-4 w-4 ml-2" />
                </Button>
              </NavLink>
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
