import { ChartPieDonutText } from "@/components/charts/ChartPieDonutText";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function BookingStatisticCard() {
  // fake data
  const chartData = [
    { name: "Pending", value: 20, fill: "#fcd34d" },
    { name: "Assigned", value: 10, fill: "#a78bfa" },
    { name: "In Progress", value: 4, fill: "#f59e0b" },
    { name: "Cancelled", value: 8, fill: "#f87171" },
    { name: "Checked In", value: 12, fill: "#38bdf8" },
    { name: "Checked Out", value: 6, fill: "#0d9488" },
    { name: "Completed", value: 40, fill: "#4ade80" },
  ];

  const chartConfig = {
    Pending: { label: "Pending", color: "#facc15" },
    Assigned: { label: "Assigned", color: "#a5b4fc" },
    Cancelled: { label: "Cancelled", color: "#f87171" },
    Completed: { label: "Completed", color: "#4ade80" },
    "Checked In": { label: "Checked In", color: "#7dd3fc" },
    "Checked Out": { label: "Checked Out", color: "#5eead4" },
    "In Progress": { label: "In Progress", color: "#f59e0b" },
  };

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

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
                ></div>
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
