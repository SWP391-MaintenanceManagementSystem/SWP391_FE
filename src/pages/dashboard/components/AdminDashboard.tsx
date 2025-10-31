import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import TotalCard from "./TotalCard";
import { HandCoinsIcon, Hotel, IdCardLanyard, Users2 } from "lucide-react";
import { RevenueChart } from "./chart/RevenueChart";
import { LowStockProgressBar } from "./chart/LowStockChart";
export default function AdminDashboard() {
  // Fake data
  const dashboardData = {
    totalCustomers: 3240,
    totalEmployees: 156,
    totalServiceCenters: 12,
    totalMembershipPackages: 8,
  };

  // Fake revenue data (90 days)
  const revenueData = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    return {
      date: date.toISOString().split("T")[0],
      totalRevenue: Math.floor(5000 + Math.random() * 15000), // $5,000 - $20,000
    };
  });

  // Fake inventory data (12 products)
  const inventoryData = [
    { name: "Engine Oil", quantity: 8, minRequired: 30 },
    { name: "Brake Fluid", quantity: 4, minRequired: 20 },
    { name: "Air Filter", quantity: 15, minRequired: 40 },
    { name: "Spark Plug", quantity: 5, minRequired: 25 },
    { name: "Coolant", quantity: 2, minRequired: 15 },
    { name: "Tire", quantity: 22, minRequired: 30 },
    { name: "Battery", quantity: 3, minRequired: 10 },
    { name: "Wiper Blade", quantity: 7, minRequired: 20 },
    { name: "Headlight", quantity: 9, minRequired: 25 },
    { name: "Transmission Fluid", quantity: 1, minRequired: 12 },
    { name: "Battery", quantity: 3, minRequired: 10 },
    { name: "Wiper Blade", quantity: 7, minRequired: 20 },
    { name: "Headlight", quantity: 9, minRequired: 25 },
    { name: "Transmission Fluid", quantity: 1, minRequired: 12 },
  ];

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ dashboard: "Dashboard" }} />
      <MainContentLayout className="grid grid-cols-1 md:gap-6 gap-4 overflow-y-auto">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 md:gap-4 font-inter h-auto">
          <TotalCard
            title="Total Revenue"
            icon={HandCoinsIcon}
            numberValue={revenueData
              .reduce((acc, item) => acc + item.totalRevenue, 0)
              .toLocaleString("en-US", { style: "currency", currency: "USD" })}
          />
          <TotalCard
            title="Total Customer"
            icon={Users2}
            numberValue={dashboardData.totalCustomers}
          />
          <TotalCard
            title="Total Employee"
            icon={IdCardLanyard}
            numberValue={dashboardData.totalEmployees}
          />
          <TotalCard
            title="Total Service Center"
            icon={Hotel}
            numberValue={dashboardData.totalServiceCenters}
          />
        </div>
        <RevenueChart data={revenueData} />
        <div className="grid grid-cols-[auto_1fr]">
          <LowStockProgressBar data={inventoryData} />
        </div>
      </MainContentLayout>
    </div>
  );
}
