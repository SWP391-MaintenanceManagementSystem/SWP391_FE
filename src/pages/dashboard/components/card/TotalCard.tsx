import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface TotalCardProps {
  title: string;
  icon: LucideIcon;
  numberValue: string | number;
}

export default function TotalCard({
  title,
  icon: Icon,
  numberValue,
}: TotalCardProps) {
  return (
    <Card className="gap-4 hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-300 border border-gray-200 dark:border-[#262626] rounded-lg bg-gradient-to-r from-purple-100 to-gray-50 dark:from-purple-800 dark:to-purple-500">
      <CardHeader className="flex flex-row items-center gap-2 ">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {numberValue !== undefined && (
          <div className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            {numberValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
