import { ChartPieDonutText } from "@/components/charts/ChartPieDonutText";
import { type ChartConfig } from "@/components/ui/chart";
import type { ServiceData } from "@/types/models/dashboard";

interface TrendingMembershipDonutChartProps {
  data?: ServiceData[];
}

const colorPalette = [
  "#8B5CF6", // violet
  "#6366F1", // indigo
  "#3B82F6", // blue
  "#06B6D4", // cyan
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#A855F7", // purple
  "#0EA5E9", // sky
  "#14B8A6", // teal
];

export function TrendingMembershipDonutChart({
  data,
}: TrendingMembershipDonutChartProps) {
  if (!data || data.length === 0) return null;

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const topData =
    sortedData.length > 5
      ? [
          ...sortedData.slice(0, 5),
          {
            name: "Other Memberships",
            value: sortedData.slice(5).reduce((sum, s) => sum + s.value, 0),
          },
        ]
      : sortedData;

  const chartData = topData.map((m, index) => ({
    membership: m.name,
    count: m.value,
    fill:
      m.name === "Other Memberships"
        ? "oklch(92% 0.004 286.32)"
        : colorPalette[index % colorPalette.length],
  }));

  const chartConfig: ChartConfig = chartData.reduce(
    (acc, s) => ({
      ...acc,
      [s.membership]: { label: s.membership, color: s.fill },
    }),
    {},
  );

  const total = data.length;

  return (
    <ChartPieDonutText
      chartData={chartData}
      chartConfig={chartConfig}
      total={total}
      title="memberships"
      nameKey="membership"
      dataKey="count"
      isLegendVisible={false}
    />
  );
}
