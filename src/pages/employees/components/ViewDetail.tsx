import {
  InfoSection,
  InputDisableWithLabel,
} from "@/components/dialog/ViewDetailDialog";
import type { EmployeeTable } from "../libs/table-types";
import AccountStatusTag from "@/components/tag/AccountStatusTag";
import dayjs from "dayjs";

type Props = {
  employee: EmployeeTable;
  title?: string;
};

export default function ViewDetailEmployeeInfo({ employee, title }: Props) {
  return (
    <div>
      <InfoSection
        title={title}
        styleFormLayout="md:grid-cols-2 md:grid-rows-3"
      >
        <InputDisableWithLabel
          label="First Name"
          id="firstName"
          value={employee.profile?.firstName}
        />
        <InputDisableWithLabel
          label="Last Name"
          id="lastName"
          value={employee.profile?.lastName}
        />
        <InputDisableWithLabel
          label="Email"
          id="email"
          value={employee.email}
        />
        <InputDisableWithLabel
          label="Phone"
          id="phone"
          value={employee.phone}
        />
        <InputDisableWithLabel
          label="Status"
          id="status"
          value={
            employee.status ? (
              <AccountStatusTag status={employee.status} />
            ) : (
              "N/A"
            )
          }
        />
        <InputDisableWithLabel
          label="Work center"
          id="center"
          value={employee.workCenter?.name ?? "Not assigned"}
        />
        <InputDisableWithLabel
          label="Start Date"
          id="startDate"
          value={
            employee.workCenter?.startDate
              ? dayjs(employee.workCenter.startDate).format("DD/MM/YYYY")
              : "N/A"
          }
        />
        <InputDisableWithLabel
          label="End Date"
          id="endDate"
          value={
            employee.workCenter?.endDate
              ? dayjs(employee.workCenter.endDate).format("DD/MM/YYYY")
              : "N/A"
          }
        />
      </InfoSection>
    </div>
  );
}
