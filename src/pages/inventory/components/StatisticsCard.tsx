import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  icon: LucideIcon;
  numberTotal?: number;
  numberValue?: number;
  description: string;
}

export default function StatisticsCard({
  title,
  icon: Icon,
  numberTotal,
  numberValue,
  description,
}: Props) {
  return (
    <Card className="h-auto flex flex-col gap-2.5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {numberValue !== undefined && (
          <div className="text-2xl font-bold">
            $
            {numberValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        )}
        {numberTotal !== undefined && (
          <div className="text-2xl font-bold">{numberTotal}</div>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
