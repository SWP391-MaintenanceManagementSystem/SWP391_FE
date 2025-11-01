import { ChartPieDonutActive } from "@/components/charts/ChartPieDonutActive";
import { type ChartConfig } from "@/components/ui/chart";

type PackageData = { name: string; value: number };

interface TrendingPackagesDonutChartProps {
  data?: PackageData[];
}

const mapPackageKey: Record<string, string> = {
  "Basic Maintenance": "basicMaintenance",
  "Standard Care": "standardCare",
  "Premium Care": "premiumCare",
  "Performance Upgrade": "performanceUpgrade",
  "Complete Protection": "completeProtection",
};

const packageChartConfig: ChartConfig = {
  basicMaintenance: { label: "Basic Maintenance", color: "#0EA5E9" },
  standardCare: { label: "Standard Care", color: "#38BDF8" },
  premiumCare: { label: "Premium Care", color: "#22D3EE" },
  performanceUpgrade: { label: "Performance Upgrade", color: "#06B6D4" },
  completeProtection: { label: "Complete Protection", color: "#0891B2" },
};

const defaultPackageData: PackageData[] = [
  { name: "Basic Maintenance", value: 210 },
  { name: "Standard Care", value: 165 },
  { name: "Premium Care", value: 132 },
  { name: "Performance Upgrade", value: 95 },
  { name: "Complete Protection", value: 72 },
];

export function TrendingPackagesDonutChart({
  data,
}: TrendingPackagesDonutChartProps) {
  const chartData = (data ?? defaultPackageData).map((p) => {
    const key =
      mapPackageKey[p.name] ?? p.name.toLowerCase().replace(/\s+/g, "");
    return {
      package: key,
      count: p.value,
      fill: packageChartConfig[key]?.color ?? "#d4d4d8", // fallback gray-300
    };
  });

  const total = chartData.length;

  return (
    <ChartPieDonutActive
      chartData={chartData}
      chartConfig={packageChartConfig}
      total={total}
      title="packages"
      nameKey="package"
      dataKey="count"
    />
  );
}
