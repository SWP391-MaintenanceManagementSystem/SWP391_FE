import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartPieDonutText } from "@/components/charts/ChartPieDonutText";
import type { ChartConfig } from "@/components/ui/chart";
import type { CustomerDashboardData } from "@/types/models/dashboard";
import { Badge } from "@/components/ui/badge";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CustomerBookingStatusChartProps {
  data: CustomerDashboardData;
}

const statusColors = {
  PENDING: "#F59E0B", // amber
  IN_PROGRESS: "#3B82F6", // blue
  FINISHED: "#8B5CF6", // violet
};

export function CustomerBookingStatusChart({
  data,
}: CustomerBookingStatusChartProps) {
  const [open, setOpen] = React.useState(false);

  if (!data?.bookingStatusSummary || data.bookingStatusSummary.length === 0) {
    return (
      <Card className="flex items-center justify-center h-80">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No booking status data available.
        </p>
      </Card>
    );
  }

  const chartData = data.bookingStatusSummary.map((item) => ({
    status: item.status,
    count: item.count,
    fill: statusColors[item.status as keyof typeof statusColors],
  }));

  const chartConfig: ChartConfig = {
    PENDING: { label: "Pending", color: statusColors.PENDING },
    IN_PROGRESS: { label: "In Progress", color: statusColors.IN_PROGRESS },
    FINISHED: { label: "Finished", color: statusColors.FINISHED },
  };

  const total = data.bookingStatusSummary.reduce((sum, s) => sum + s.count, 0);

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
          <div>
            <CardTitle>Booking Status</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="mt-4 flex flex-col items-center">
          <ChartPieDonutText
            chartData={chartData}
            chartConfig={chartConfig}
            total={total}
            title="Status"
            nameKey="status"
            dataKey="count"
            isLegendVisible={true}
          />

          <TooltipWrapper content="View detailed list">
            <Badge
              variant="outline"
              className="text-xs font-medium cursor-pointer mt-3"
              onClick={() => setOpen(true)}
            >
              View List
            </Badge>
          </TooltipWrapper>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md font-inter">
          <DialogHeader>
            <DialogTitle>Booking Status Details</DialogTitle>
            <DialogDescription>
              Detailed breakdown of your booking statuses.
            </DialogDescription>
          </DialogHeader>

          <ul className="mt-2 space-y-2">
            {data.bookingStatusSummary.map((item, index) => (
              <li
                key={index}
                className="flex justify-between text-sm border-b pb-1 border-gray-200 dark:border-gray-700"
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {chartConfig[item.status as keyof ChartConfig]?.label ??
                    item.status}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {item.count}
                </span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
