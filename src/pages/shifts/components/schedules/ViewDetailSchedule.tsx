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
    <div className="overflow-y-auto max-h-[500px] grid grid-cols-1 gap-7">
      {/* Date Section */}
      <InfoSection
        title="Schedule Information"
        styleFormLayout="md:grid-cols-2"
      >
        <InputDisableWithLabel
          label="Date"
          id="date"
          value={dayjs(item.date).format("YYYY-MM-DD")}
          styleFormat="md:col-span-2"
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
      <InfoSection
        title="Work Center Information"
        styleFormLayout="md:grid-cols-2"
      >
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
