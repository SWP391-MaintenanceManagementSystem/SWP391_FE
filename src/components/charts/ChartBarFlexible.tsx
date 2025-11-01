import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";

interface ChartBarFlexibleProps {
  title: string;
  description?: string;
  data: { [key: string]: string | number }[];
  dataKeys: string[];
  labelKey?: string;
  config: ChartConfig;
  stack?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export function ChartBarFlexible({
  title,
  description,
  data,
  dataKeys,
  labelKey = "label",
  config,
  stack = false,
  showXAxis = true,
  showYAxis = true,
}: ChartBarFlexibleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            {showXAxis && (
              <XAxis dataKey={labelKey} tickLine={false} axisLine={false} />
            )}
            {showYAxis && <YAxis tickLine={false} axisLine={false} />}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Legend
              formatter={(value) => (
                <span className="text-neutral-900 dark:text-neutral-100">
                  {value}
                </span>
              )}
              wrapperStyle={{ gap: 40 }}
            />
            {dataKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={config[key]?.color ?? "#8884d8"}
                stackId={stack ? "a" : undefined}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
