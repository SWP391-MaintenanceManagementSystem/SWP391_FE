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
import { ChartColumnBig } from "lucide-react";
import { useMemo } from "react";
const COLOR_MAP: Record<string, string> = {
  Pending: "#fcd34d",
  Assigned: "#a78bfa",
  "In Progress": "#f59e0b",
  Cancelled: "#f87171",
  "Checked In": "#38bdf8",
  "Checked Out": "#0d9488",
  Completed: "#4ade80",
};

export default function BookingStatisticCard({
  data,
}: {
  data?: StaffDashboardData;
}) {
  const { chartData, chartConfig, total, hasOverview } = useMemo(() => {
    const overview = data?.bookingOverview;
    const stats = overview?.bookingStatistics ?? [];
    const processed = stats.map((item) => ({
      ...item,
      fill: COLOR_MAP[item.name] ?? "#d1d5db",
    }));
    return {
      chartData: processed,
      chartConfig: Object.fromEntries(
        processed.map((item) => [
          item.name,
          { label: item.name, color: COLOR_MAP[item.name] },
        ]),
      ),
      total: overview?.total || 0,
      hasOverview: !!overview,
    };
  }, [data]);

  // --- SKELETON LOADING ---
  if (!hasOverview) {
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

  // --- EMPTY STATE ---
  if (total === 0) {
    return (
      <Card className="shadow-sm rounded-xl w-full xl:w-[340px] border border-gray-200 dark:border-[#2b2b2b] flex flex-col items-center justify-center py-10">
        <ChartColumnBig size={54} />
        <CardTitle>No Bookings Yet</CardTitle>
        <CardDescription className="text-center mt-2">
          Once bookings appear, you’ll see a visual summary here.
        </CardDescription>
      </Card>
    );
  }

  // --- MAIN RENDER ---
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
          {chartData.map((item) => {
            const percent = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-24 text-xs font-medium text-gray-600 dark:text-gray-300">
                  {item.name}
                </div>

                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-700 ease-in-out"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: item.fill,
                    }}
                  />
                </div>

                <span className="text-xs text-gray-400">
                  ({percent.toFixed(1)}%)
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
