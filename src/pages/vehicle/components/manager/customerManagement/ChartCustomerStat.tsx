import { useGetStatusStat } from "@/services/manager/queries";
import { useMemo } from "react";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartPieDonutText } from "@/components/charts/ChartPieDonutText";
import { ChartPieLabel } from "@/components/charts/ChartPieLabel";
import "animate.css";
import { Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCustomerBox() {
  const { data, isLoading } = useGetStatusStat("CUSTOMER");
  const total = data?.total;
  const premium = data?.premium;
  const chartStatus = useMemo(() => {
    const stats = data?.data || [];
    const mapStatus: Record<string, string> = {
      VERIFIED: "verified",
      NOT_VERIFY: "notVerified",
      DISABLED: "disable",
      BANNED: "banned",
    };

    return stats.map((s) => ({
      status: mapStatus[s.status] ?? s.status.toLowerCase(),
      count: s.count,
      fill: `var(--color-${mapStatus[s.status] ?? s.status.toLowerCase()})`,
    }));
  }, [data]);

  const chartConfig = {
    count: {
      label: "Customer",
    },
    verified: {
      label: "Verified",
      color: "var(--chart-verified)",
    },
    notVerified: {
      label: "Not Verified",
      color: "var(--chart-notVerified)",
    },
    banned: {
      label: "Banned",
      color: "var(--chart-banned)",
    },
    disable: {
      label: "Disable",
      color: "var(--chart-disabled)",
    },
    premium: {
      label: "Premium",
      color: "oklch(82.7% 0.119 306.383)",
    },
    others: {
      label: "Others",
      color: "oklch(28.3% 0.141 291.089)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col sm:flex-row md:flex-col items-center gap-8 md:min-w-[298px] font-inter">
      <CardHeader className="w-full">
        <CardTitle className="font-semibold text-gray-text-header text-2xl text-center">
          Statistics
        </CardTitle>
      </CardHeader>
      {!isLoading ? (
        <CardContent className="flex flex-col sm:flex-row md:flex-col gap-10">
          <ChartPieDonutText
            chartData={chartStatus}
            chartConfig={chartConfig}
            nameKey="status"
            dataKey="count"
            total={total ?? 0}
            title="Customers"
          />
          <div>
            <ChartPieLabel
              chartData={[
                {
                  name: "premium",
                  value: premium?.count || 0,
                  fill: "var(--color-premium)",
                },
                {
                  name: "others",
                  value: (total || 0) - (premium?.count || 0),
                  fill: "var(--color-others)",
                },
              ]}
              chartConfig={chartConfig}
              nameKey="name"
              dataKey="value"
              maxHeight="max-h-[220px]"
            />
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {premium?.percentage}% customers subscribed to Premium
            </p>
          </div>
        </CardContent>
      ) : (
        <div className="animate__animated animate__fadeIn">
          <Loader className="animate-spin" />
        </div>
      )}
    </Card>
  );
}
