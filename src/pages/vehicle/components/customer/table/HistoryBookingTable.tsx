import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/DataTable";
import type { CustomerBookingHistory } from "@/types/models/booking";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { getColumns } from "./columns";
import useCustomerBookingHistory from "@/services/booking/hooks/useCustomerBookingHistory";

interface HistoryBookingTableProps {
  vehicleId: string; 
}

export default function HistoryBookingTable({
  vehicleId,
}: HistoryBookingTableProps) {
  console.log("🚀 ~ HistoryBookingTable ~ vehicleId:", vehicleId);
  // pagination + filter state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const { historyData, isLoading } = useCustomerBookingHistory({
    page,
    pageSize,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
    search: searchValue || undefined,
    status: undefined,
    vehicleId,
  });

  const rawList = historyData?.data ?? [];
  const columns = getColumns();

  return (
    <Card className="h-full flex-1 md:min-h-[500px] min-h-[600px]">
      <CardContent className="font-inter flex flex-col gap-4 h-full">
        <h3 className="font-semibold text-gray-text-header h-fit">
          Booking History
        </h3>

        <DataTable<CustomerBookingHistory, unknown>
          data={rawList}
          columns={columns as ColumnDef<CustomerBookingHistory, unknown>[]}
          pageIndex={(historyData?.page ?? 1) - 1}
          pageSize={historyData?.pageSize ?? 10}
          totalPage={historyData?.totalPages ?? 1}
          isLoading={isLoading}
          onPageChange={(newPage) => setPage(newPage + 1)}
          onPageSizeChange={setPageSize}
          manualPagination
          isSearch={true}
          searchPlaceholder="Search by vehicle or status..."
          onSearchChange={setSearchValue}
          manualSearch
          sorting={sorting}
          onSortingChange={setSorting}
          manualSorting
        />
      </CardContent>
    </Card>
  );
}
