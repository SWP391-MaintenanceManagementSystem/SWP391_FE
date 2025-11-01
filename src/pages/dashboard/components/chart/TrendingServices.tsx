import { ChartPieDonutActive } from "@/components/charts/ChartPieDonutActive";
import { type ChartConfig } from "@/components/ui/chart";

type ServiceData = {
  name: string;
  value: number;
};

interface TrendingServicesDonutChartProps {
  data?: ServiceData[];
}
const mapServiceKey: Record<string, string> = {
  "Engine Repair": "engineRepair",
  "Tire Change": "tireChange",
  "Oil Change": "oilChange",
  "Battery Service": "batteryService",
  "AC Repair": "acRepair",
  "Brake Service": "brakeService",
};

const chartConfig: ChartConfig = {
  engineRepair: { label: "Engine Repair", color: "#7C3AED" },
  tireChange: { label: "Tire Change", color: "#A78BFA" },
  oilChange: { label: "Oil Change", color: "#6366F1" },
  batteryService: { label: "Battery Service", color: "#38BDF8" },
  acRepair: { label: "AC Repair", color: "#4F46E5" },
  brakeService: { label: "Brake Service", color: "#818CF8" },
};

const defaultServiceData: ServiceData[] = [
  { name: "Engine Repair", value: 120 },
  { name: "Tire Change", value: 98 },
  { name: "Oil Change", value: 165 },
  { name: "Battery Service", value: 87 },
  { name: "AC Repair", value: 76 },
  { name: "Brake Service", value: 142 },
];

export function TrendingServicesDonutChart({
  data,
}: TrendingServicesDonutChartProps) {
  const chartData = (data ?? defaultServiceData).map((s) => {
    const key =
      mapServiceKey[s.name] ?? s.name.toLowerCase().replace(/\s+/g, "");

    return {
      service: key,
      count: s.value,
      fill: chartConfig[key]?.color ?? "#d1d5db",
    };
  });

  const totalServices = chartData.length;

  return (
    <ChartPieDonutActive
      chartData={chartData}
      chartConfig={chartConfig}
      total={totalServices}
      title="services"
      nameKey="service"
      dataKey="count"
    />
  );
}
