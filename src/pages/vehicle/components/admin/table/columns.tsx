import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import AccountStatusTag from "@/components/AccountStatusTag";
import ColActions from "./ColActions";
import { type AccountStatus } from "@/types/enums/accountStatus";
import { type Customer } from "@/types/models/account";
// import { faker } from "@faker-js/faker";

// export type CustomerTable = AccountWithProfile;
// // Dummy Data -- CUSTOMER
// const createRandomCustomer = (numCustomer: number) => Array.from({ length: numCustomer }, () => ({
//   firstName: faker.person.firstName(),
//   lastName: faker.person.lastName(),
//   email: faker.internet.email(),
//   address: faker.location.streetAddress(),
//   is_premium: faker.helpers.arrayElement([true, false]),
//   status: faker.helpers.enumValue(AccountStatus),
// }));
// export const dummyData: CustomerTable[] = createRandomCustomer(300);

export type CustomerTable = {
  id: string;
  email: string;
  phone: string;
  status: AccountStatus;
  profile?: Customer;
};

const columnHelper = createColumnHelper<CustomerTable>();

export const columns = [
  // SELECT checkbox
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
    enableSorting: false,
    enableHiding: false,
  }),

  // FIRST NAME
  columnHelper.accessor("profile.firstName", {
    header: (info) => <SortHeader title="First Name" info={info} />,
    size: 50,
    cell: (info) => info.getValue(),
    meta: {
      title: "First Name",
    },
  }),

  // LAST NAME
  columnHelper.accessor("profile.lastName", {
    header: (info) => <SortHeader title="Last Name" info={info} />,
    size: 50,
    cell: (info) => info.getValue(),
    meta: {
      title: "Last Name",
    },
  }),

  // EMAIL
  columnHelper.accessor("email", {
    header: (info) => <SortHeader title="Email" info={info} />,
    size: 100,
    cell: (info) => info.getValue(),
    meta: {
      title: "Email",
    },
  }),

  // PHONE
  columnHelper.accessor("phone", {
    header: (info) => <SortHeader title="Phone" info={info} />,
    size: 50,
    cell: (info) => info.getValue(),
    meta: {
      title: "Phone",
    },
  }),

  // ADDRESS
  columnHelper.accessor("profile.address", {
    header: (info) => <SortHeader title="Address" info={info} />,
    size: 100,
    cell: (info) => info.getValue(),
    meta: {
      title: "Address",
    },
  }),

  // PREMIUM (from profile)
  columnHelper.accessor("profile.isPremium", {
    header: (info) => <FilterHeader column={info.column} title="Premium" />,
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
    header: (info) => <FilterHeader column={info.column} title="Status" />,
    size: 50,
    cell: (info) => <AccountStatusTag status={info.getValue()} />,
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
    cell: (props) => <ColActions row={props.row} />,
  }),
];
