import {
  InfoSection,
  InputDisableWithLabel,
} from "@/components/dialog/ViewDetailDialog";
import { Loader } from "lucide-react";
import "animate.css";
import type { EmployeeTable } from "../libs/table-types";
import AccountStatusTag from "@/components/tag/AccountStatusTag";

type Props = {
  employee: EmployeeTable;
  isLoaded?: boolean;
  title?: string;
};

export default function ViewDetailEmployeeInfo({
  employee,
  isLoaded,
  title,
}: Props) {
  return (
    <div>
      {isLoaded ? (
        <div className="animate__animated animate__fadeIn">
          <Loader className="animate-spin" />
        </div>
      ) : (
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
          {/*<InputDisableWithLabel
            label="Experience Years"
            id="experienceYears"
            value={employee.profile?.experienceYears}
          />*/}
        </InfoSection>
      )}
    </div>
  );
}
