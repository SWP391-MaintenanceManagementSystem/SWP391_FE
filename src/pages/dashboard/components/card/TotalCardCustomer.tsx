import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface TotalCardProps {
  icon: LucideIcon;
  title: string;
  numberValue: string | number;
  bgColor?: string;
  iconColor?: string;
  description?: string;
}

export default function TotalCardCustomer({
  icon: Icon,
  title,
  numberValue,
  description = "",
  bgColor = "bg-blue-100",
  iconColor = "text-blue-600",
}: TotalCardProps) {
  return (
    <Card
      className="
        p-4 rounded-xl border bg-white dark:bg-[#1a1a1a]
        border-gray-200 dark:border-[#2a2a2a]
        shadow-sm
        flex flex-col gap-3 hover:shadow-lg dark:hover:shadow-gray-700
      "
    >
      {/* Icon box */}
      <div
        className={`
          w-10 h-10 rounded-lg flex items-center justify-center 
          ${bgColor}
        `}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {title}
      </p>

      {/* Number */}
      <p className="text-2xl font-bold text-black dark:text-white">
        {numberValue}
      </p>
      {/* Sub title */}
      <p className="text-xs text-muted-foreground dark:text-white">
        {description}
      </p>
    </Card>
  );
}
