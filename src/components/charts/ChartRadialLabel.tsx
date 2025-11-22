import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart with a label";

type ChartRadialLabelProps = {
  chartData: Record<string, string | number>[];
  chartConfig: ChartConfig;
  nameKey?: string;
  dataKey?: string;
};

export function ChartRadialLabel({
  chartData,
  chartConfig,
  nameKey = "name",
  dataKey = "value",
}: ChartRadialLabelProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] w-full h-full"
    >
      <RadialBarChart
        data={chartData}
        startAngle={-90}
        endAngle={380}
        innerRadius={30}
        outerRadius={110}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey={nameKey} />}
        />
        <RadialBar dataKey={dataKey} background>
          <LabelList
            position="insideStart"
            dataKey={nameKey}
            className="fill-white capitalize mix-blend-luminosity"
            fontSize={11}
          />
        </RadialBar>
      </RadialBarChart>
    </ChartContainer>
  );
}
