import { ChartPieDonutActive } from "@/components/charts/ChartPieDonutActive";
import { type ChartConfig } from "@/components/ui/chart";

type MembershipData = { name: string; value: number };

interface TrendingMembershipDonutChartProps {
  data?: MembershipData[];
}

const mapMembershipKey: Record<string, string> = {
  "Silver Plan": "silverPlan",
  "Gold Plan": "goldPlan",
  "Platinum Plan": "platinumPlan",
  "Elite Plan": "elitePlan",
};

const membershipChartConfig: ChartConfig = {
  silverPlan: { label: "Silver Plan", color: "#94A3B8" }, // silver
  goldPlan: { label: "Gold Plan", color: "#EAB308" }, // gold
  platinumPlan: { label: "Platinum Plan", color: "#A1A1AA" }, // platinum
  elitePlan: { label: "Elite Plan", color: "#6B7280" }, // dark premium
};

const defaultMembershipData: MembershipData[] = [
  { name: "Silver Plan", value: 85 },
  { name: "Gold Plan", value: 142 },
  { name: "Platinum Plan", value: 98 },
  { name: "Elite Plan", value: 56 },
];

export function TrendingMembershipDonutChart({
  data,
}: TrendingMembershipDonutChartProps) {
  const chartData = (data ?? defaultMembershipData).map((m) => {
    const key =
      mapMembershipKey[m.name] ?? m.name.toLowerCase().replace(/\s+/g, "");
    return {
      membership: key,
      count: m.value,
      fill: membershipChartConfig[key]?.color ?? "#d4d4d8",
    };
  });

  const total = chartData.length;

  return (
    <ChartPieDonutActive
      chartData={chartData}
      chartConfig={membershipChartConfig}
      total={total}
      title="membership"
      nameKey="membership"
      dataKey="count"
    />
  );
}
