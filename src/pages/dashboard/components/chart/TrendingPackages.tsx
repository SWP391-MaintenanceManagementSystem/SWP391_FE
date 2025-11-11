import { ChartPieDonutText } from "@/components/charts/ChartPieDonutText";
import { type ChartConfig } from "@/components/ui/chart";
import type { ServiceData } from "@/types/models/dashboard";

interface TrendingPackagesDonutChartProps {
  data: ServiceData[];
}

const colorPalette = [
  "#0EA5E9", // blue-500
  "#38BDF8", // sky-400
  "#22D3EE", // cyan-400
  "#06B6D4", // cyan-500
  "#0891B2", // cyan-600
  "#F59E0B", // amber-500
  "#10B981", // emerald-500
  "#EF4444", // red-500
  "#6366F1", // indigo-500
  "#8B5CF6", // violet-500
];

export function TrendingPackagesDonutChart({
  data,
}: TrendingPackagesDonutChartProps) {
  if (!data || data.length === 0) return null;

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const topData =
    sortedData.length > 5
      ? [
          ...sortedData.slice(0, 5),
          {
            name: "Other Packages",
            value: sortedData.slice(5).reduce((sum, s) => sum + s.value, 0),
          },
        ]
      : sortedData;

  const chartData = topData.map((p, index) => ({
    package: p.name,
    count: p.value,
    fill:
      p.name === "Other Packages"
        ? "oklch(92% 0.004 286.32)"
        : colorPalette[index % colorPalette.length],
  }));

  const chartConfig: ChartConfig = chartData.reduce(
    (acc, s) => ({
      ...acc,
      [s.package]: { label: s.package, color: s.fill },
    }),
    {},
  );

  const total = data.length;

  return (
    <ChartPieDonutText
      chartData={chartData}
      chartConfig={chartConfig}
      total={total}
      title="packages"
      nameKey="package"
      dataKey="count"
      isLegendVisible={false}
    />
  );
}
