import { ChartBarFlexible } from "@/components/charts/ChartBarFlexible";
import { useGetServiceCenterStat } from "@/services/dashboard/queries/admin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export default function CenterBarChar() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetServiceCenterStat();
  const chartData =
    data?.filter(
      (item: any) => Number(item.bookings) > 0 || Number(item.revenue) > 0,
    ) ?? [];

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-56" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-80 mt-2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full rounded-lg mt-4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <ChartBarFlexible
      title={t("dashboard.admin.charts.center_performance")}
      description={t("dashboard.admin.charts.center_desc")}
      data={chartData}
      dataKeys={["bookings", "revenue"]}
      labelKey="centerName"
      showXAxis
      showYAxis
      config={{
        bookings: {
          label: t("dashboard.admin.charts.bookings"),
          color: "#c4b5fd",
        },
        revenue: {
          label: t("dashboard.admin.charts.revenue"),
          color: "#8b5cf6",
        },
      }}
    />
  );
}
