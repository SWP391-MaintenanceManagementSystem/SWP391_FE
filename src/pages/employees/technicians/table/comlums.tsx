import { createColumnHelper } from "@tanstack/react-table";
import { type EmployeeTable } from "../../libs/table-types";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import AccountStatusTag from "@/components/tag/AccountStatusTag";
import ColActions from "../../components/ColActions";
import { Badge } from "@/components/ui/badge";
import type { ServiceCenter } from "@/types/models/center";

export const getColumns = (
  handleFilterChange: (field: string, value: string) => void,
  currentFilters: { status: string; centerId: string },
  centerList: ServiceCenter[],
) => {
  const columnHelper = createColumnHelper<EmployeeTable>();

  return [
    columnHelper.display({
      id: "number",
      header: "#",
      size: 50,
      cell: ({ row, table }) =>
        row.index +
        1 +
        table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize,
      enableSorting: false,
      enableHiding: false,
    }),

    // FIRST NAME
    columnHelper.accessor("profile.firstName", {
      id: "firstName",
      header: (info) => <SortHeader title="First Name" info={info} />,
      size: 50,
      cell: (info) => info.getValue(),
      meta: {
        title: "First Name",
      },
    }),

    // LAST NAME
    columnHelper.accessor("profile.lastName", {
      id: "lastName",
      header: (info) => <SortHeader title="Last Name" info={info} />,
      size: 50,
      cell: (info) => info.getValue(),
      meta: {
        title: "Last Name",
      },
    }),

    // EMAIL
    columnHelper.accessor("email", {
      id: "email",
      header: (info) => <SortHeader title="Email" info={info} />,
      size: 100,
      cell: (info) => info.getValue(),
      meta: {
        title: "Email",
      },
    }),

    // PHONE
    columnHelper.accessor("phone", {
      id: "phone",
      header: (info) => <SortHeader title="Phone" info={info} />,
      size: 50,
      cell: (info) => info.getValue(),
      meta: {
        title: "Phone",
      },
    }),

    // Work center
    columnHelper.accessor((row) => row.workCenter?.name ?? "Not assigned", {
      id: "name",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Work Center"
          selectedValue={currentFilters.centerId}
          onFilterChange={(value) => handleFilterChange("centerId", value)}
        />
      ),
      size: 50,
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
      meta: {
        title: "Work Center",
        filterVariant: "filterWorkCenter",
        filterOptions: centerList.map((c) => c.id),
        labelOptions: Object.fromEntries(centerList.map((c) => [c.id, c.name])),
      },
    }),

    // STATUS
    columnHelper.accessor("status", {
      id: "status",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Status"
          selectedValue={currentFilters.status}
          onFilterChange={(value) => handleFilterChange("status", value)}
        />
      ),
      size: 50,
      cell: (info) => (
        <AccountStatusTag status={info.getValue() || "NOT_VERIFY"} />
      ),
      filterFn: "equals",
      meta: {
        title: "Status",
        filterVariant: "filterStatus",
        filterOptions: ["VERIFIED", "NOT_VERIFY", "DISABLED", "BANNED"],
        labelOptions: {
          VERIFIED: "Verified",
          NOT_VERIFY: "Not verified",
          DISABLED: "Disabled",
          BANNED: "Banned",
        },
      },
    }),

    // ACTIONS
    columnHelper.display({
      id: "action",
      header: () => "Action",
      size: 20,
      cell: (props) => {
        const { pageIndex, pageSize } = props.table.getState().pagination;

        return (
          <ColActions
            row={props.row}
            currentPage={pageIndex + 1}
            currentPageSize={pageSize}
          />
        );
      },
    }),
  ];
};
