import StatisticsCard from "./StatisticsCard";
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";

export default function StatisticsSection() {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 lg:grid-rows-1 gap-3 md:gap-6 font-inter h-auto">
      <StatisticsCard
        icon={Package}
        title="Total Items"
        numberTotal={100}
        description="Across 4 products"
      />
      <StatisticsCard
        icon={DollarSign}
        title="Total Value"
        numberTotal={100}
        description="Current inventory value"
      />
      <StatisticsCard
        icon={AlertTriangle}
        title="Low Stock Items"
        numberTotal={100}
        description="Need restocking"
      />
      <StatisticsCard
        icon={TrendingUp}
        title="Categories"
        numberTotal={4}
        description="Product categories"
      />
    </div>
  );
}
