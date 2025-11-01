import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "Dynamic revenue area chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-premium)",
  },
} satisfies ChartConfig;

type RevenueData = {
  date: string;
  totalRevenue: number;
};

type Props = {
  data: RevenueData[];
};

export function RevenueChart({ data }: Props) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const referenceDate = React.useMemo(() => {
    const lastItem = data[data.length - 1];
    return lastItem ? new Date(lastItem.date) : new Date();
  }, [data]);

  const filteredData = React.useMemo(() => {
    const daysMap = { "7d": 7, "30d": 30, "90d": 90 };
    const daysToSubtract = daysMap[timeRange as keyof typeof daysMap] ?? 90;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return data.filter((item) => new Date(item.date) >= startDate);
  }, [data, timeRange, referenceDate]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex flex-wrap items-center justify-between gap-4 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Showing total revenue for the selected period
          </CardDescription>
        </div>

        {/* Tổng doanh thu */}
        <div className="flex items-center gap-3">
          {/* Dropdown chọn khoảng thời gian */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                  formatter={(value) => [
                    `Revenue `,
                    `$${Number(value).toLocaleString()}`,
                  ]}
                />
              }
            />
            <Area
              dataKey="totalRevenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
