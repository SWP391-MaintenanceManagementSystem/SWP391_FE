import { ChartPieDonutText } from "@/components/charts/ChartPieDonutText";
import type { ChartConfig } from "@/components/ui/chart";
import type { ServiceData } from "@/types/models/dashboard";

const colorPalette = [
  "#7C3AED",
  "#A78BFA",
  "#6366F1",
  "#38BDF8",
  "#4F46E5",
  "#818CF8",
  "#06B6D4",
  "#60A5FA",
  "#F59E0B",
  "#10B981",
  "#EF4444",
];

interface TrendingServicesRadialChartProps {
  data: ServiceData[];
}

export function TrendingServicesRadialChart({
  data,
}: TrendingServicesRadialChartProps) {
  if (!data || data.length === 0) return null;
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const topData =
    sortedData.length > 5
      ? [
          ...sortedData.slice(0, 5),
          {
            name: "Other Services",
            value: sortedData.slice(5).reduce((sum, s) => sum + s.value, 0),
          },
        ]
      : sortedData;

  const chartData = topData.map((s, index) => ({
    name: s.name,
    value: s.value,
    fill:
      s.name === "Other Services"
        ? "oklch(92% 0.004 286.32)"
        : colorPalette[index % colorPalette.length],
  }));

  const chartConfig: ChartConfig = chartData.reduce(
    (acc, s) => ({
      ...acc,
      [s.name]: { label: s.name, color: s.fill },
    }),
    {},
  );

  return (
    <ChartPieDonutText
      chartData={chartData}
      chartConfig={chartConfig}
      nameKey="name"
      dataKey="value"
      title="services"
      total={data.length}
      isLegendVisible={false}
    />
  );
}
