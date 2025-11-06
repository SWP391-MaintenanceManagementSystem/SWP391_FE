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

interface CustomerBookingsByCenterChartProps {
  data: CustomerDashboardData;
}

const colorPalette = [
  "#3B82F6", // blue
  "#EC4899", // pink
  "#8B5CF6", // violet
  "#10B981", // emerald
  "#F59E0B", // amber
  "#6366F1", // indigo
  "#14B8A6", // teal
  "#F97316", // orange
  "#84CC16", // lime
  "#E11D48", // rose
];

export function CustomerBookingsByCenterChart({
  data,
}: CustomerBookingsByCenterChartProps) {
  const [open, setOpen] = React.useState(false);

  if (!data?.bookingsByCenter || data.bookingsByCenter.length === 0) {
    return (
      <Card className="flex items-center justify-center h-80">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No booking data by center available.
        </p>
      </Card>
    );
  }

  const chartData = data.bookingsByCenter.map((item, index) => ({
    center: item.center,
    count: item.count,
    fill: colorPalette[index % colorPalette.length],
  }));

  const chartConfig: ChartConfig = chartData.reduce(
    (acc, s) => ({
      ...acc,
      [s.center]: { label: s.center, color: s.fill },
    }),
    {}
  );

  const total = data.bookingsByCenter.reduce((sum, s) => sum + s.count, 0);

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
          <div>
            <CardTitle>Bookings by Center</CardTitle>
            <p className="text-3xl font-semibold text-sky-600 mt-2">
              {total.toLocaleString()}
            </p>
            {/* <p className="text-sm text-gray-500">{total} Orders</p> */}
          </div>
        </CardHeader>

        <CardContent className="mt-4 flex flex-col items-center">
          <ChartPieDonutText
            chartData={chartData}
            chartConfig={chartConfig}
            total={total}
            title="Centers"
            nameKey="center"
            dataKey="count"
            isLegendVisible={true}
          />

          <TooltipWrapper content="View list">
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
            <DialogTitle>Center Booking Details</DialogTitle>
            <DialogDescription>
              Breakdown of bookings across all service centers.
            </DialogDescription>
          </DialogHeader>

          <ul className="mt-2 space-y-2">
            {data.bookingsByCenter.map((item, index) => (
              <li
                key={index}
                className="flex justify-between text-sm border-b pb-1 border-gray-200 dark:border-gray-700"
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {item.center}
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
