import { Skeleton } from "@/components/ui/skeleton";
import type { CustomerDashboardData } from "@/types/models/dashboard";
import { CircleDollarSign, BarChart3, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OverviewCardSpending({
  data,
  isLoading,
}: {
  data: CustomerDashboardData | undefined;
  isLoading: boolean;
}) {
  if (!data) return null;

  const totalSpendingYear = data.totalSpending?.year ?? 0;
  const totalSpendingMonth = data.totalSpending?.month ?? 0;
  const totalSpendingWeek = data.totalSpending?.week ?? 0;

  const totalSpending = totalSpendingYear;
  const averageSpending = totalSpendingYear / 12;
  const peakSpending = Math.max(
    totalSpendingWeek,
    totalSpendingMonth,
    totalSpendingYear
  );

  const cards = [
    {
      title: "Total Spending",
      icon: CircleDollarSign,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      value: totalSpending,
      description: "Your total spending this year.",
    },
    {
      title: "Average Spending",
      icon: BarChart3,
      iconColor: "text-sky-500",
      bgColor: "bg-sky-50",
      value: averageSpending,
      description: "Your average monthly spending.",
    },
    {
      title: "Peak Spending",
      icon: TrendingUp,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
      value: peakSpending,
      description: "Your highest spending during the period.",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-4 font-inter">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-4 rounded-2xl bg-white dark:bg-[#1e1e1e] shadow-sm border border-gray-200 dark:border-[#2b2b2b]"
            >
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-8 w-2/3" />
            </div>
          ))
        : cards.map(
            (
              { title, icon: Icon, iconColor, bgColor, value, description },
              i
            ) => (
              <Card
                key={i}
                className="h-auto flex flex-col gap-2.5 cursor-default hover:bg-muted/40 transition-colors"
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">{title}</CardTitle>
                  <div className={`p-2 rounded-xl ${bgColor}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    $
                    {value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {description}
                  </p>
                </CardContent>
              </Card>
            )
          )}
    </div>
  );
}
