import type { Customer as CustomerModel } from "@/types/models/account";
import { AccountStatus } from "@/types/enums/accountStatus";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import AccountStatusTag from "@/components/AccountStatusTag";
import { Checkbox } from "@/components/ui/checkbox";
import ColActions from "./ColActions";
import SortHeader from "./SortHeader";
import FilterHeader from "./FilterHeader";

export type CustomerTable = CustomerModel & {
  email: string;
  status: AccountStatus;
};

// Dummy Data -- CUSTOMER
const createRandomCustomer = (numCustomer: number) =>
  Array.from({ length: numCustomer }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    is_premium: faker.helpers.arrayElement([true, false]),
    status: faker.helpers.enumValue(AccountStatus),
  }));

export const dummyData: CustomerTable[] = createRandomCustomer(300);

const columnHelper = createColumnHelper<CustomerTable>();

export const columns = [
  // SELECT
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="!outline-none"
      />
    ),
    size: 50,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="!outline-none"
      />
    ),
    meta: {
      title: "Select",
    },
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("firstName", {
    header: (info) => <SortHeader title="First Name" info={info} />,
    size: 50,
    cell: (info) => info.getValue(),
    meta: {
      title: "First Name",
    },
  }),

  columnHelper.accessor("lastName", {
    header: (info) => <SortHeader title="Last Name" info={info} />,
    size: 50,
    cell: (info) => info.getValue(),
    meta: {
      title: "Last Name",
    },
  }),

  columnHelper.accessor("email", {
    header: (info) => <SortHeader title="Email" info={info} />,
    size: 100,
    cell: (info) => info.getValue(),
    meta: {
      title: "Email",
    },
  }),

  columnHelper.accessor("address", {
    header: (info) => <SortHeader title="Address" info={info} />,
    size: 100,
    cell: (info) => info.getValue(),
    meta: {
      title: "Address",
    },
  }),

  columnHelper.accessor("is_premium", {
    header: (info) => <FilterHeader column={info.column} title="Premium" />,
    size: 50,
    filterFn: "equals",
    cell: (info) => (info.row.getValue("is_premium") ? "Yes" : "No"),
    meta: {
      filterVariant: "filterPremium",
      filterOptions: ["true", "false"],
      labelOptions: { true: "Yes", false: "No" },
      title: "Premium",
    },
  }),

  columnHelper.accessor("status", {
    header: (info) => <FilterHeader column={info.column} title="Status" />,
    size: 50,
    filterFn: "equals",
    cell: (info) => <AccountStatusTag status={info.getValue()} />,
    meta: {
      filterVariant: "filterStatus",
      filterOptions: ["VERIFIED", "NOT_VERIFIED", "DISABLED", "BANNED"],
      labelOptions: {
        VERIFIED: "Verified",
        NOT_VERIFIED: "Not verified",
        DISABLED: "Disabled",
        BANNED: "Banned",
      },
      title: "Status",
    },
  }),

  columnHelper.display({
    id: "action",
    header: () => "Action",
    size: 20,
    cell: (props) => <ColActions row={props.row} />,
  }),
];
