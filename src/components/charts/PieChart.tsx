import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a label";

type ChartPieLabelProps = {
  chartData: Record<string, string | number>[];
  chartConfig: ChartConfig;
  nameKey?: string;
  dataKey?: string;
};

export function ChartPieLabel({
  chartData,
  chartConfig,
  nameKey = "name",
  dataKey = "value",
}: ChartPieLabelProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground w-full h-full mx-auto aspect-square max-h-[250px] pb-0"
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
