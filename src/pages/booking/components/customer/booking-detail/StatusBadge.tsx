import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status?: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ASSIGNED: "bg-green-100 text-green-800",
    CHECKED_IN: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-red-100 text-red-800",
    IN_PROGRESS: "bg-indigo-100 text-indigo-800",
    default: "bg-gray-100 text-gray-800",
  };

  const style =
    statusStyles[status as keyof typeof statusStyles] || statusStyles.default;

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-full font-mono text-sm inline-flex items-center gap-1",
        style,
        "hover:shadow-md transition-shadow duration-200"
      )}
    >
      {status || "N/A"}
    </span>
  );
}
