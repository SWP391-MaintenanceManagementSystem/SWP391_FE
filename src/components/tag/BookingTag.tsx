import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@/types/enums/bookingStatus";

interface BookingTagProps {
  status: BookingStatus;
}

export default function BookingTag({ status }: BookingTagProps) {
  const config: Record<
    BookingTagProps["status"],
    { label: string; color: string }
  > = {
    PENDING: { label: "Pending", color: "bg-amber-100 text-amber-800" },
    ASSIGNED: { label: "Assigned", color: "bg-sky-100 text-sky-800" },
    IN_PROGRESS: {
      label: "In Progress",
      color: "bg-indigo-100 text-indigo-800",
    },
    CHECKED_IN: { label: "Checked In", color: "bg-purple-100 text-purple-800" },
    CHECKED_OUT: {
      label: "Checked Out",
      color: "bg-emerald-100 text-emerald-800",
    },
    COMPLETED: { label: "Completed", color: "bg-green-100 text-green-800" },
    CANCELLED: { label: "Cancelled", color: "bg-rose-100 text-rose-800" },
  };

  const { label, color } = config[status] || {
    label: "Unknown",
    color: "bg-gray-100 text-gray-800",
  };

  return (
    <Badge
      className={`${color} font-medium px-3 py-1 rounded-full border-0 text-xs`}
      variant="outline"
    >
      {label}
    </Badge>
  );
}
