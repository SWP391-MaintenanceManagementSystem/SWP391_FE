import * as React from "react";
import dayjs from "dayjs";
import { ChartBarFlexible } from "@/components/charts/ChartBarFlexible";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCustomerDashboardData } from "@/services/dashboard/queries/customer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SpendingSummaryBarChart() {
  const { data, isLoading } = useGetCustomerDashboardData();
  const [view, setView] = React.useState<"week" | "month" | "year">("week");

  if (isLoading || !data) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-56" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-80 mt-2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full rounded-lg mt-4" />
        </CardContent>
      </Card>
    );
  }

  const spendingData = data.totalSpending[view] || [];

  const chartData = spendingData.map((item) => ({
    label:
      view === "week"
        ? dayjs(item.key).format("ddd") // Mon, Tue, Wed
        : view === "month"
        ? dayjs(item.key).format("MMM D") // Nov 4
        : dayjs()
            .month(Number(item.key) - 1)
            .format("MMM"), // Jan, Feb, Mar
    value: item.amount,
  }));

  const viewLabel =
    view === "week"
      ? "This Week"
      : view === "month"
      ? "This Month"
      : "This Year";

  return (
    <Card className="w-full shadow-sm border rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
        <div>
          <CardTitle>Spending Summary</CardTitle>
          <CardDescription>
            {`Your spending overview — ${viewLabel}`}
          </CardDescription>
        </div>

        <Tabs
          value={view}
          onValueChange={(v) => setView(v as "week" | "month" | "year")}
        >
          <TabsList className="grid grid-cols-3 bg-muted rounded-lg">
            <TabsTrigger
              value="week"
              className="data-[state=active]:bg-[#8B5CF6] 
dark:data-[state=active]:bg-[#8B5CF6]
data-[state=active]:text-white 
transition-all"
            >
              Week
            </TabsTrigger>
            <TabsTrigger
              value="month"
              className="data-[state=active]:bg-[#8B5CF6] 
dark:data-[state=active]:bg-[#8B5CF6]
data-[state=active]:text-white 
transition-all
"
            >
              Month
            </TabsTrigger>
            <TabsTrigger
              value="year"
              className="data-[state=active]:bg-[#8B5CF6] 
dark:data-[state=active]:bg-[#8B5CF6]
data-[state=active]:text-white 
transition-all
"
            >
              Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="mt-4">
        <ChartBarFlexible
          title=""
          description=""
          data={chartData}
          dataKeys={["value"]}
          labelKey="label"
          showXAxis
          showYAxis
          config={{
            value: {
              label: "Spending ($)",
              color: "#8B5CF6",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
