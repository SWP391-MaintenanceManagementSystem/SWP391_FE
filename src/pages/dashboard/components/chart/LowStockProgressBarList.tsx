import { Progress } from "@/components/ui/progress";

export type LowStockItem = {
  name: string;
  quantity: number;
  minRequired: number;
};

type Props = {
  data: LowStockItem[];
};

export function LowStockProgressBar({ data }: Props) {
  return (
    <div className="flex flex-col gap-4 md:max-h-[200px] overflow-y-auto">
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
            <Progress value={percent} color={color} gradient className="h-2" />
          </div>
        );
      })}
    </div>
  );
}
