import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export const description = "A pie chart with a legend";

type ChartPieLegendProps = {
  chartData: Record<string, string | number>[];
  chartConfig: ChartConfig;
  nameKey?: string;
  dataKey?: string;
  maxHeight?: string;
};

export function ChartPieLegend({
  chartData,
  chartConfig,
  nameKey = "name",
  dataKey = "value",
  maxHeight,
}: ChartPieLegendProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className={cn(
        "[&_.recharts-pie-label-text]:fill-foreground w-full h-full mx-auto aspect-square pb-0",
        maxHeight,
      )}
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey={dataKey} label nameKey={nameKey} />
        <ChartLegend
          content={<ChartLegendContent nameKey={nameKey} />}
          className="-translate-y-1 flex-wrap gap-2 *:h-1/8 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
