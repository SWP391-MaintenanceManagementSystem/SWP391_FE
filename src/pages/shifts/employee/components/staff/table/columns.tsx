import { createColumnHelper } from "@tanstack/react-table";
import type { WorkSchedule } from "@/types/models/shift";
import { Badge } from "@/components/ui/badge";
import SortHeader from "@/components/table/SortHeader";
import dayjs from "dayjs";
import { ShiftCell } from "@/pages/shifts/admin/schedules/table/ShiftCell";

export const getColumns = () => {
  const columnHelper = createColumnHelper<WorkSchedule>();
  return [
    columnHelper.display({
      id: "number",
      header: "#",
      size: 10,
      cell: ({ row, table }) =>
        row.index +
        1 +
        table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize,
      enableSorting: false,
      enableHiding: false,
    }),

    columnHelper.accessor("date", {
      id: "date",
      header: (info) => <SortHeader title="Date" info={info} />,
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
      size: 10,
      meta: {
        title: "Date",
      },
    }),
    columnHelper.accessor(
      (row) =>
        `${row.shift.startTime.slice(0, 5)} - ${row.shift.endTime.slice(0, 5)}`,
      {
        id: "time",
        header: "Time",
        size: 80,
        cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
        meta: {
          title: "Time",
        },
      },
    ),
    columnHelper.accessor("shift.name", {
      id: "shiftName",
      header: "Shift",
      cell: ({ row }) => <ShiftCell shift={row.original.shift} />,
      meta: {
        title: "Shift",
      },
    }),
    columnHelper.accessor("shift.serviceCenter.name", {
      id: "centerName",
      header: "Work Center",
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
      meta: {
        title: "Work Center",
        filterVariant: "filterWorkCenter",
      },
    }),
  ];
};
