import StatisticsCard from "./StatisticsCard";
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { useGetPartStat } from "@/services/manager/queries";

export default function StatisticsSection() {
  const { data } = useGetPartStat();

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 md:gap-4 font-inter h-auto ">
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
    </div>
  );
}
