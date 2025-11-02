import StatisticsCard from "./StatisticsCard";
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { useGetPartStat } from "@/services/manager/queries";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatisticsSection() {
  const { data, isLoading } = useGetPartStat();
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 md:gap-4 font-inter h-auto">
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-4 rounded-2xl bg-white shadow-sm border animate-pulse"
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
            title="Total Items"
            numberTotal={data?.totalQuantity || 0}
            description={`Across ${data?.totalItems} products`}
          />
          <StatisticsCard
            icon={DollarSign}
            title="Total Value"
            numberValue={data?.totalValue || 0}
            description="Current inventory value"
          />
          <StatisticsCard
            icon={AlertTriangle}
            title="Low Stock Items"
            numberTotal={data?.lowStockItems || 0}
            description="Need restocking"
            textStyle="text-red-600"
          />
          <StatisticsCard
            icon={TrendingUp}
            title="Categories"
            numberTotal={data?.categories || 0}
            description="Product categories"
          />
        </>
      )}
    </div>
  );
}
