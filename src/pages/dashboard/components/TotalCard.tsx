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
    <Card className="gap-4">
      <CardHeader className="flex flex-row items-center">
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
