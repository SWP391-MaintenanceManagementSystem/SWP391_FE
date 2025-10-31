import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OctagonAlert } from "lucide-react";

type InventoryItem = {
  name: string;
  quantity: number;
  minRequired: number;
};

type Props = {
  data: InventoryItem[];
};

export function LowStockProgressBar({ data }: Props) {
  return (
    <Card className="w-full lg:w-[380px] md:max-h-[480px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-semibold">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <OctagonAlert className="h-6 w-6 text-destructive" />
          </div>
          Low Stock Items
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 md:max-h-[380px] overflow-y-auto">
        {data.map((item) => {
          const percent = Math.round((item.quantity / item.minRequired) * 100);
          const color =
            percent < 25 ? "#ef4444" : percent < 50 ? "#f97316" : "#f59e0b";

          return (
            <div
              key={item.name}
              className="flex flex-col gap-1 border-b pb-2 last:border-none"
            >
              <div className="flex justify-between text-sm font-medium">
                <span>{item.name}</span>
                <span className="text-muted-foreground">
                  {item.quantity}/{item.minRequired}
                </span>
              </div>
              <Progress
                value={percent}
                color={color}
                gradient
                className="h-2"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
