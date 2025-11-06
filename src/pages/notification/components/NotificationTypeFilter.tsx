import { FacetedFilter } from "@/components/FacetedFilter";
import { NotificationType } from "@/types/enums/notificationType";

interface NotificationTypeFilterProps {
  value: NotificationType[];
  setValue: (vals: NotificationType[]) => void;
}

export function NotificationTypeFilter({
  value,
  setValue,
}: NotificationTypeFilterProps) {
  const options = Object.values(NotificationType).map((type) => ({
    value: type,
    label: type.charAt(0) + type.slice(1).toLowerCase(),
  }));

  return (
    <FacetedFilter<NotificationType>
      title="Notification Type"
      options={options}
      value={value}
      setValue={setValue}
      multiple={true}
    />
  );
}
