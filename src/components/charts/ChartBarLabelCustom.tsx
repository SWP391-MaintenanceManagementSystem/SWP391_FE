import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartBarLabelCustomProps {
  title: string;
  description?: string;
  data: { [key: string]: string | number }[];
  dataKey: string;
  labelKey?: string;
  config: ChartConfig;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export function ChartBarLabelCustom({
  title,
  description,
  data,
  dataKey,
  labelKey = "month",
  config,
  showXAxis = false,
  showYAxis = false,
}: ChartBarLabelCustomProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey={labelKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => String(value).slice(0, 3)}
              hide={!showYAxis}
            />
            <XAxis dataKey={dataKey} type="number" hide={!showXAxis} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey={dataKey}
              layout="vertical"
              fill={config[dataKey]?.color}
              radius={4}
            >
              <LabelList
                dataKey={labelKey}
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey={dataKey}
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
