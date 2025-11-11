import {
  InfoSection,
  InputDisableWithLabel,
} from "@/components/dialog/ViewDetailDialog";

import type { ServiceCenter } from "@/types/models/center";

interface ViewDetailCenterProps {
  item: ServiceCenter;
}

export default function ViewDetailCenter({ item }: ViewDetailCenterProps) {
  return (
    <div className="overflow-y-auto  max-h-[410px]">
      <InfoSection>
        <InputDisableWithLabel
          label="Service Center"
          id="serviceCenter"
          value={item.name}
          styleFormat="md:col-span-2"
        />
        <InputDisableWithLabel
          label="Address"
          id="address"
          value={item.address}
          styleFormat="md:col-span-2"
        />
      </InfoSection>
    </div>
  );
}
