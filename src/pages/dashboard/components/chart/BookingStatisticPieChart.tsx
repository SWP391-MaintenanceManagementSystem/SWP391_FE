import { ChartPieDonutText } from "@/components/charts/ChartPieDonutText";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTechnicianDashboardData } from "@/services/dashboard/queries/technician";

export default function TechnicianBookingStatisticCard() {
  const { data, isLoading } = useGetTechnicianDashboardData();

  const colorMap: Record<string, string> = {
    Pending: "#facc15",
    "In Progress": "#fb923c",
    Completed: "#22c55e",
  };

  if (isLoading || !data) {
    return (
      <Card className="shadow-sm rounded-xl w-full xl:w-[340px] border border-gray-200 dark:border-[#2b2b2b] p-4">
        <CardHeader>
          <Skeleton className="h-5 w-36 mb-2" />
          <Skeleton className="h-3 w-48" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-[auto_1fr] xl:grid-cols-1 items-start gap-6 mt-4">
          <div className="flex justify-center">
            <Skeleton className="h-28 w-28 rounded-full" />
          </div>
          <div className="space-y-3">
            {["Pending", "In Progress", "Completed"].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 flex-1" />
                <Skeleton className="h-3 w-10" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    { name: "Pending", value: data.pending, fill: colorMap["Pending"] },
    { name: "In Progress", value: data.inProgress, fill: colorMap["In Progress"] },
    { name: "Completed", value: data.completed, fill: colorMap["Completed"] },
  ];

  const total = data.totalBookings;
  const chartConfig = Object.fromEntries(
    chartData.map((item) => [item.name, { label: item.name, color: item.fill }])
  );

  return (
    <Card className="shadow-sm rounded-xl w-full xl:w-[340px] border border-gray-200 dark:border-[#2b2b2b]">
      <CardHeader>
        <CardTitle>Booking Overview</CardTitle>
        <CardDescription>Technician booking status distribution</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-[auto_1fr] xl:grid-cols-1 items-center gap-8 justify-center">
        {/* Donut chart */}
        <ChartPieDonutText
          chartData={chartData}
          chartConfig={chartConfig}
          total={total}
          title="Bookings"
          isLegendVisible={false}
        />

        {/* Progress bars */}
        <div className="space-y-2 w-full">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-24 text-xs font-medium text-gray-700 dark:text-gray-200">
                {item.name}
              </div>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${(item.value / total) * 100}%`,
                    backgroundColor: item.fill,
                  }}
                />
              </div>
              <span className="text-xs text-gray-400">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
