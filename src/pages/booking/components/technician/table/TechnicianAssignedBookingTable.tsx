import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./columns";
import type { TechnicianBooking } from "@/types/models/booking";

interface TechnicianAssignedBookingTableProps {
  data: TechnicianBooking[];
  isLoading?: boolean;
  isFetching?: boolean;
  totalPage?: number;
  pageIndex?: number;
  pageSize?: number;
  onPageChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function TechnicianAssignedBookingTable({
  data,
  isLoading,
  isFetching,
  totalPage,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: TechnicianAssignedBookingTableProps) {
  const columns = getColumns();

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={isLoading}
      isFetching={isFetching}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalPage={totalPage}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      manualPagination
      isSearch
      searchValue={["id", "customerId", "vehicleId"]}
      searchPlaceholder="booking ID, customer, vehicle"
    />
  );
}
