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

export default function SpendingSummaryBarChart() {
  const { data, isLoading } = useGetCustomerDashboardData();

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

  const chartData = [
    { label: "Week", value: data.totalSpending.week },
    { label: "Month", value: data.totalSpending.month },
    { label: "Year", value: data.totalSpending.year },
  ];

  return (
    <ChartBarFlexible
      title="Spending Summary"
      description="Weekly, monthly, and yearly spending overview"
      data={chartData}
      dataKeys={["value"]}
      labelKey="label"
      showXAxis
      showYAxis
      config={{
        value: {
          label: "Spending ($)",
          color: "#10b981", // emerald-500
        },
      }}
    />
  );
}
