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
import { useGetRevenueByRange } from "@/services/dashboard/queries/admin";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "Dynamic revenue area chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-premium)",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const [timeRange, setTimeRange] = React.useState("3m");

  const { data, isLoading } = useGetRevenueByRange(timeRange);

  if (isLoading) {
    return (
      <Card className="pt-0">
        <CardHeader className="flex flex-wrap items-center justify-between gap-4 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-10 w-[160px] rounded-lg" />
        </CardHeader>

        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <div className="aspect-auto h-[250px] w-full bg-gray-100 rounded-xl animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex flex-wrap items-center justify-between gap-4 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Showing total revenue for the selected period
          </CardDescription>
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1w">Last 7 days</SelectItem>
            <SelectItem value="1m">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data?.data}>
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
