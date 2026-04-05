import StatisticsCard from "./StatisticsCard";
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { useGetPartStat } from "@/services/manager/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export default function StatisticsSection() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetPartStat();
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 md:gap-4 font-inter h-auto">
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-4 rounded-2xl shadow-sm border animate-pulse"
            >
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-8 w-2/3" />
            </div>
          ))}
        </>
      ) : (
        <>
          <StatisticsCard
            icon={Package}
            title={t("dashboard.admin.inventory.total_items")}
            numberTotal={data?.totalQuantity || 0}
            description={t("dashboard.admin.inventory.across_products", { count: data?.totalItems || 0 })}
          />
          <StatisticsCard
            icon={DollarSign}
            title={t("dashboard.admin.inventory.total_value")}
            numberValue={data?.totalValue || 0}
            description={t("dashboard.admin.inventory.current_value")}
          />
          <StatisticsCard
            icon={AlertTriangle}
            title={t("dashboard.admin.inventory.low_stock_items")}
            numberTotal={data?.lowStockItems || 0}
            description={t("dashboard.admin.inventory.need_restocking")}
            textStyle="text-red-600"
          />
          <StatisticsCard
            icon={TrendingUp}
            title={t("dashboard.admin.inventory.categories")}
            numberTotal={data?.categories || 0}
            description={t("dashboard.admin.inventory.product_categories")}
          />
        </>
      )}
    </div>
  );
}
