import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import type { SortingState, ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/table/DataTable";
import { useGetWorkSchedulesList } from "@/services/shift/queries";
import type { WorkSchedule } from "@/types/models/shift";
import { getColumns } from "./table/columns";
import { Button } from "@/components/ui/button";
import { CalendarDays, CalendarRange, Table, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Calendar04 from "@/components/calendar-04";
import dayjs from "dayjs";
import type { DateRange } from "react-day-picker";
import clsx from "clsx";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarView from "./CalendarView";
import { useAuth } from "@/contexts/AuthContext";

export default function TechnicianSchedule() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [currentTab, setCurrentTab] = useState("calendar");
  const { auth } = useAuth();

  const {
    data: apiData,
    isLoading,
    isFetching,
  } = useGetWorkSchedulesList({
    page,
    pageSize,
    employeeId: auth?.user?.id,
    dateFrom: dateRange?.from
      ? dayjs(dateRange.from).format("YYYY-MM-DD")
      : undefined,
    dateTo: dateRange?.to
      ? dayjs(dateRange.to).format("YYYY-MM-DD")
      : undefined,

    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
  });

  const columns = getColumns();
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ viewSchedule: "Work Schedule" }} />
      <MainContentLayout className="grid grid-cols-1">
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full h-full"
        >
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="calendar">
                <CalendarDays /> Calendar View
              </TabsTrigger>
              <TabsTrigger value="list">
                <Table /> Table View
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="list">
            <Card className=" w-full h-full grid min-h-[600px]">
              <CardContent>
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
                                ? dayjs(dateRange.from).isSame(
                                    dateRange.to,
                                    "day",
                                  )
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
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarView employeeId={auth.user?.id || ""} />
          </TabsContent>
        </Tabs>
      </MainContentLayout>
    </div>
  );
}
