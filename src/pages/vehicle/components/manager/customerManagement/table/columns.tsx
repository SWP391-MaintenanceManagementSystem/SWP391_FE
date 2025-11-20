import { createColumnHelper } from "@tanstack/react-table";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import AccountStatusTag from "@/components/tag/AccountStatusTag";
import ColActions from "./ColActions";
import type { CustomerTable } from "../../../libs/table-types";
import type { AccountRole } from "@/types/enums/role";

export const getColumns = (
  handleFilterChange: (
    field: string,
    value: string | boolean | undefined,
  ) => void,
  currentFilters: { status: string; isPremium: boolean | undefined },
  currentUserRole: AccountRole,
) => {
  const columnHelper = createColumnHelper<CustomerTable>();
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

    // ADDRESS
    columnHelper.accessor("profile.address", {
      id: "address",
      header: (info) => <SortHeader title="Address" info={info} />,
      size: 100,
      cell: (info) => info.getValue(),
      meta: {
        title: "Address",
      },
    }),

    // PREMIUM (from profile)
    columnHelper.accessor("profile.isPremium", {
      id: "isPremium",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Premium"
          selectedValue={
            currentFilters.isPremium === undefined
              ? ""
              : currentFilters.isPremium
                ? "true"
                : "false"
          }
          onFilterChange={(value) =>
            handleFilterChange(
              "isPremium",
              value === "" ? undefined : value === "true",
            )
          }
        />
      ),
      size: 50,
      cell: (info) => (info.getValue() ? "Yes" : "No"),
      filterFn: "equals",
      meta: {
        title: "Premium",
        filterVariant: "filterPremium",
        filterOptions: ["true", "false"],
        labelOptions: { true: "Yes", false: "No" },
      },
    }),

    // STATUS
    columnHelper.accessor("status", {
      id: "status",
      header: (info) =>
        currentUserRole === "ADMIN" ? (
          <FilterHeader
            column={info.column}
            title="Status"
            selectedValue={currentFilters.status}
            onFilterChange={(value) => handleFilterChange("status", value)}
          />
        ) : (
          "Status"
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
      header: currentUserRole === "ADMIN" ? "Action" : "View",
      size: 20,
      cell: (props) => {
        const { pageIndex, pageSize } = props.table.getState().pagination;

        return (
          <ColActions
            row={props.row}
            currentPage={pageIndex + 1}
            currentPageSize={pageSize}
            currentUserRole={currentUserRole}
          />
        );
      },
    }),
  ];
};
