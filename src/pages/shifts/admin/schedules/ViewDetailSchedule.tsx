import {
  InfoSection,
  InputDisableWithLabel,
} from "@/components/dialog/ViewDetailDialog";
import type { WorkSchedule } from "@/types/models/shift";
import dayjs from "dayjs";

interface ViewDetailScheduleProps {
  item: WorkSchedule;
}

export default function ViewDetailSchedule({ item }: ViewDetailScheduleProps) {
  return (
    <div className="overflow-y-auto max-h-[480px] grid grid-cols-1 gap-5">
      {/* Date Section */}
      <InfoSection
        title="Schedule Information"
        styleFormLayout="md:grid-cols-2"
      >
        <InputDisableWithLabel
          label="Date"
          id="date"
          value={dayjs(item.date).format("DD/MM/YYYY")}
          styleFormat="md:col-span-2"
        />
        <InputDisableWithLabel
          label="Create on"
          id="createdAt"
          value={dayjs(item.createdAt).format("HH:mm [on] DD/MM/YYYY")}
        />
        <InputDisableWithLabel
          label="Last Updated on"
          id="updatedAt"
          value={dayjs(item.updatedAt).format("HH:mm [on] DD/MM/YYYY")}
        />
      </InfoSection>

      {/* Shift Section */}
      <InfoSection
        title="Shift Information"
        styleFormLayout="md:grid-rows-2 md:grid-cols-2 "
      >
        <InputDisableWithLabel
          label="Shift Name"
          id="name"
          value={item.shift.name}
          styleFormat="md:col-span-2"
        />
        <InputDisableWithLabel
          label="Start Time"
          id="startTime"
          value={item.shift.startTime.slice(0, 5)}
        />
        <InputDisableWithLabel
          label="End Time"
          id="endTime"
          value={item.shift.endTime.slice(0, 5)}
        />
      </InfoSection>

      {/* Employee Section */}
      <InfoSection
        title="Employee Information"
        styleFormLayout="md:grid-rows-2 md:grid-cols-2 "
      >
        <InputDisableWithLabel
          label="First Name"
          id="firstName"
          value={item.account.profile?.firstName}
        />
        <InputDisableWithLabel
          label="Last Name"
          id="lastName"
          value={item.account.profile?.lastName}
        />
        <InputDisableWithLabel
          label="Email"
          id="email"
          value={item.account.email}
        />
        <InputDisableWithLabel
          label="Role"
          id="role"
          value={item.account.role}
        />
      </InfoSection>

      {/* Work Center Section */}
      <InfoSection title="Work Center Information">
        <InputDisableWithLabel
          label="Work Center"
          id="centerName"
          value={item.shift.serviceCenter.name}
        />
        <InputDisableWithLabel
          label="Address"
          id="address"
          value={item.shift.serviceCenter.address}
        />
      </InfoSection>
    </div>
  );
}
