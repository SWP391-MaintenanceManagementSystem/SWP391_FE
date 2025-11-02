import { Label, Pie, PieChart, Sector } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

export const description = "A donut chart with an active sector";
type ChartPieDonutActiveProps = {
  chartData: Record<string, string | number>[];
  chartConfig: ChartConfig;
  total: number;
  nameKey?: string;
  dataKey?: string;
  title: string;
};

export function ChartPieDonutActive({
  chartData,
  chartConfig,
  nameKey = "name",
  dataKey = "value",
  total,
  title,
}: ChartPieDonutActiveProps) {
  const maxIndex = chartData.reduce(
    (maxIdx, item, idx, arr) =>
      (item[dataKey] as number) > (arr[maxIdx][dataKey] as number)
        ? idx
        : maxIdx,
    0,
  );
  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground w-full h-full mx-auto aspect-square max-h-[240px] pb-0"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={50}
          strokeWidth={5}
          activeIndex={maxIndex}
          activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
            <Sector {...props} outerRadius={outerRadius + 10} />
          )}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {title}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
