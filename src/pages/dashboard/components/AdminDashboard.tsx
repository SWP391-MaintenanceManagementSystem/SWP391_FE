import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import TotalCard from "./TotalCard";
import { HandCoinsIcon, Hotel, IdCardLanyard, Users2 } from "lucide-react";
import { RevenueChart } from "./RevenueChart";

export default function AdminDashboard() {
  // Fake data
  const dashboardData = {
    totalCustomers: 3240,
    totalEmployees: 156,
    totalServiceCenters: 12,
    totalMembershipPackages: 8,
  };

  // Fake revenue data (90 ngày gần nhất)
  const revenueData = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    return {
      date: date.toISOString().split("T")[0],
      totalRevenue: Math.floor(5000 + Math.random() * 15000), // $5,000 - $20,000
    };
  });

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ dashboard: "Dashboard" }} />
      <MainContentLayout className="flex flex-col md:gap-8 gap-6">
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

        {/* Truyền fake revenue data */}
        <RevenueChart data={revenueData} />
      </MainContentLayout>
    </div>
  );
}
