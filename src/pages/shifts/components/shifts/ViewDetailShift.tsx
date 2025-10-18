import {
  InfoSection,
  InputDisableWithLabel,
} from "@/components/dialog/ViewDetailDialog";
import VehicleStatusTag from "@/components/tag/VehicleStatusTag";
import type { Shift } from "@/types/models/shift";
import { Users } from "lucide-react";

interface ViewDetailShiftProps {
  item: Shift;
}

export default function ViewDetailShift({ item }: ViewDetailShiftProps) {
  return (
    <div className="overflow-y-auto  max-h-[410px]">
      <InfoSection styleFormLayout="md:grid-rows-4 md:grid-cols-2 ">
        <InputDisableWithLabel
          label="Shift Name"
          id="name"
          value={item.name}
          styleFormat="md:col-span-2"
        />
        <InputDisableWithLabel
          label="Start Time"
          id="startTime"
          value={item.startTime.slice(0, 5)}
        />
        <InputDisableWithLabel
          label="End Time"
          id="endTime"
          value={item.endTime.slice(0, 5)}
        />
        <InputDisableWithLabel
          label="Maximum Slots"
          id="maxSlots"
          value={
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{item.maximumSlot}</span>
            </div>
          }
        />
        <InputDisableWithLabel
          label="Status"
          id="status"
          value={<VehicleStatusTag status={item.status} />}
        />
        <InputDisableWithLabel
          label="Service Center"
          id="serviceCenter"
          value={item.serviceCenter.name}
          styleFormat="md:col-span-2"
        />
      </InfoSection>
    </div>
  );
}
