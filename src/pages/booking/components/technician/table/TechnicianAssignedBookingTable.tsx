import { useState, useMemo } from "react";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./columns";
import type { TechnicianBooking } from "@/types/models/booking";
import type { SortingState } from "@tanstack/react-table";

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

  const [sorting, setSorting] = useState<SortingState>([]);

  const sortedData = useMemo(() => {
    if (!data || sorting.length === 0) return data;
    const { id, desc } = sorting[0];

    return [...data].sort((a, b) => {
      const valA = (a as any)[id];
      const valB = (b as any)[id];


      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === "string" && typeof valB === "string") {
        return desc
          ? valB.localeCompare(valA)
          : valA.localeCompare(valB);
      }

      if (valA instanceof Date || valB instanceof Date) {
        const tA = new Date(valA).getTime();
        const tB = new Date(valB).getTime();
        return desc ? tB - tA : tA - tB;
      }
      if (typeof valA === "number" && typeof valB === "number") {
        return desc ? valB - valA : valA - valB;
      }

      return 0;
    });
  }, [data, sorting]);

  return (
    <DataTable
      columns={columns}
      data={sortedData ?? []}
      isLoading={isLoading}
      isFetching={isFetching}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalPage={totalPage}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      manualPagination
      manualSorting
      sorting={sorting}
      onSortingChange={setSorting}
      isSearch
      searchValue={["id", "customerId", "vehicleId"]}
      searchPlaceholder="booking ID, customer, vehicle"
    />
  );
}
