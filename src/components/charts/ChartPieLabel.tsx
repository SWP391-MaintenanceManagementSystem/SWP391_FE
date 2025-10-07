import { Pie, PieChart, LabelList } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export const description = "A pie chart with a label";

type ChartPieLabelProps = {
  chartData: Record<string, string | number>[];
  chartConfig: ChartConfig;
  nameKey?: string;
  dataKey?: string;
  maxHeight?: string;
};

export function ChartPieLabel({
  chartData,
  chartConfig,
  nameKey = "name",
  dataKey = "value",
  maxHeight,
}: ChartPieLabelProps) {
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

        <Pie data={chartData} dataKey={dataKey}>
          <LabelList
            dataKey={nameKey}
            position="inside"
            className="fill-white  font-semibold"
            stroke="none"
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
