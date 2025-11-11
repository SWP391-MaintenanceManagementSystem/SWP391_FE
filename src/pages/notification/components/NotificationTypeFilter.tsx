import { FacetedFilter } from "@/components/FacetedFilter";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationType } from "@/types/enums/notificationType";

interface NotificationTypeFilterProps {
  value: NotificationType[];
  setValue: (vals: NotificationType[]) => void;
}

export function NotificationTypeFilter({
  value,
  setValue,
}: NotificationTypeFilterProps) {
  const { auth } = useAuth();
  let options = Object.values(NotificationType).map((type) => ({
    value: type,
    label: type.charAt(0) + type.slice(1).toLowerCase(),
  }));

  if (auth.user?.role === "CUSTOMER") {
    options = options.filter(
      (option) => option.value !== NotificationType.SHIFT,
    );
  } else if (auth.user?.role === "STAFF" || auth.user?.role === "TECHNICIAN") {
    options = options.filter(
      (option) =>
        option.value !== NotificationType.MEMBERSHIP &&
        option.value !== NotificationType.PAYMENT,
    );
  }

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
