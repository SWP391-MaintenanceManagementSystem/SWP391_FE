import { Label, Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";
type ChartPieDonutTextProps = {
  chartData: Record<string, string | number>[];
  chartConfig: ChartConfig;
  total: number;
  nameKey?: string;
  dataKey?: string;
  title: string;
  isLegendVisible?: boolean;
};

export function ChartPieDonutText({
  chartData,
  chartConfig,
  nameKey = "name",
  dataKey = "value",
  total,
  title,
  isLegendVisible = true,
}: ChartPieDonutTextProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground w-full h-full mx-auto aspect-square max-h-[240px] pb-0"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={({ payload }) => {
            if (!payload?.length) return null;
            const { name, value, payload: item } = payload[0];
            const color = item.fill || payload[0].color;

            return (
              <div className="flex items-center gap-2 rounded-md bg-background px-2 py-1 shadow-sm text-sm">
                <span
                  className="inline-block h-3 w-3"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs">
                  {name} {value}
                </span>
              </div>
            );
          }}
        />

        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={50}
          strokeWidth={5}
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
        {isLegendVisible && (
          <ChartLegend
            content={<ChartLegendContent nameKey={nameKey} />}
            className="-translate-y-1 flex-wrap gap-2 *:h-1/8 *:justify-center"
          />
        )}
      </PieChart>
    </ChartContainer>
  );
}
