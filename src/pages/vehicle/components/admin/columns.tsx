import type { Customer as CustomerModel } from "@/types/models/account";
import { AccountStatus } from "@/types/enums/accountStatus";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import AccountStatusTag from "@/components/AccountStatusTag";
import { Checkbox } from "@/components/ui/checkbox";
import ColActions from "./ColActions";

// Dummy Data -- CUSTOMER
export type CustomerTable = CustomerModel & {
  email: string;
  status: AccountStatus;
};

const createRandomCustomer = (numCustomer: number) =>
  Array.from({ length: numCustomer }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    is_premium: faker.helpers.arrayElement([true, false]),
    status: faker.helpers.enumValue(AccountStatus),
  }));

export const dummyData: CustomerTable[] = createRandomCustomer(100);

const columnHelper = createColumnHelper<CustomerTable>();

export const columns = [
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
  columnHelper.accessor("firstName", {
    header: () => "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address", {
    header: () => "Address",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("is_premium", {
    header: () => "Premium",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => <AccountStatusTag status={info.getValue()} />,
  }),
  columnHelper.display({
    id: "action",
    header: () => "Action",
    cell: (props) => <ColActions row={props.row} />,
  }),
];
