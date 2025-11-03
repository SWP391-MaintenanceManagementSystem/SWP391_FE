import { ChartPieDonutText } from "@/components/charts/ChartPieDonutText";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { StaffDashboardData } from "@/types/models/dashboard";

export default function BookingStatisticCard({
  data,
}: {
  data?: StaffDashboardData;
}) {
  const colorMap: Record<string, string> = {
    Pending: "#fcd34d",
    Assigned: "#a78bfa",
    "In Progress": "#f59e0b",
    Cancelled: "#f87171",
    "Checked In": "#38bdf8",
    "Checked Out": "#0d9488",
    Completed: "#4ade80",
  };

  // --- SKELETON LOADING ---
  if (!data?.bookingOverview) {
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
            {Array.from({ length: 6 }).map((_, i) => (
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

  const chartData = data.bookingOverview.bookingStatistics.map((item) => ({
    ...item,
    fill: colorMap[item.name] ?? "#d1d5db",
  }));

  const total = data.bookingOverview.total;

  const chartConfig = Object.fromEntries(
    chartData.map((item) => [
      item.name,
      { label: item.name, color: colorMap[item.name] },
    ]),
  );

  return (
    <Card className="shadow-sm rounded-xl w-full xl:w-[340px] border border-gray-200 dark:border-[#2b2b2b]">
      <CardHeader>
        <CardTitle>Booking Statistics</CardTitle>
        <CardDescription>
          Visual summary of current bookings and their statuses.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-[auto_1fr] xl:grid-cols-1 items-center gap-8 justify-center">
        <ChartPieDonutText
          chartData={chartData}
          chartConfig={chartConfig}
          total={total}
          title="Bookings"
          isLegendVisible={false}
        />

        <div className="space-y-2">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-24 text-xs font-medium text-gray-600 dark:text-gray-300">
                {item.name}
              </div>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${(item.value / total) * 100}%`,
                    backgroundColor: item.fill,
                  }}
                />
              </div>
              <span className="text-xs text-gray-400">
                ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
