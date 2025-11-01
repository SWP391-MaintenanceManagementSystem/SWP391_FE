import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import TotalCard from "./TotalCard";
import { HandCoinsIcon, Hotel, IdCardLanyard, Users2 } from "lucide-react";
import { RevenueChart } from "./chart/RevenueChart";
import { LowStockProgressBar } from "./chart/LowStockChart";
import { ChartBarFlexible } from "@/components/charts/ChartBarFlexible";
import { NavLink } from "react-router-dom";
import { TrendingServicesDonutChart } from "./chart/TrendingServices";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TrendingPackagesDonutChart } from "./chart/TrendingPackages";
import { TrendingMembershipDonutChart } from "./chart/TrendingMembership";
export default function AdminDashboard() {
  const dashboardData = {
    totalCustomers: 3240,
    totalEmployees: 156,
    totalServiceCenters: 12,
    mostPopularMembership: "Gold Plan",
    mostPopularService: "Oil Change",
    mostPopularPackage: "Basic Package",
  };

  const revenueData = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    return {
      date: date.toISOString().split("T")[0],
      totalRevenue: Math.floor(5000 + Math.random() * 15000),
    };
  });

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
  ];

  const serviceCentersData = [
    { centerName: "Center A", bookings: 45, revenue: 1500 },
    { centerName: "Center B", bookings: 30, revenue: 1200 },
    { centerName: "Center C", bookings: 50, revenue: 1800 },
    { centerName: "Center D", bookings: 25, revenue: 900 },
    { centerName: "Center E", bookings: 40, revenue: 1300 },
    { centerName: "Center F", bookings: 35, revenue: 1100 },
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
              .toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
          />
          <NavLink to={"/vehicles"}>
            <TotalCard
              title="Total Customer"
              icon={Users2}
              numberValue={dashboardData.totalCustomers}
            />
          </NavLink>

          <NavLink to={"/employees/staffs"}>
            <TotalCard
              title="Total Employee"
              icon={IdCardLanyard}
              numberValue={dashboardData.totalEmployees}
            />
          </NavLink>

          <TotalCard
            title="Total Service Center"
            icon={Hotel}
            numberValue={dashboardData.totalServiceCenters}
          />
        </div>
        <RevenueChart data={revenueData} />
        <Card>
          <CardHeader>
            <CardTitle>Customer Purchase Trends</CardTitle>
            <CardDescription>
              Analyze purchase distribution across services, maintenance
              packages, and memberships.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid xl:grid-cols-3 gap-8">
            {/* Services */}
            <div className="flex flex-col  gap-1 items-center">
              <TrendingServicesDonutChart />
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
                Services
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Top service:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {dashboardData.mostPopularService}
                </span>
              </p>
            </div>

            {/* Packages */}
            <div className="flex flex-col  gap-1 items-center border-l border-r border-gray-200 dark:border-gray-700 px-4">
              <TrendingPackagesDonutChart />
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
                Maintenance Packages
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Most chosen:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {dashboardData.mostPopularPackage}
                </span>
              </p>
            </div>

            {/* Membership */}
            <div className="flex flex-col items-center gap-1">
              <TrendingMembershipDonutChart />
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
                Membership Plans
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Top tier:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {dashboardData.mostPopularMembership}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
          <LowStockProgressBar data={inventoryData} />
          <ChartBarFlexible
            title="Service Center Performance"
            description="Booking volume and revenue across service centers"
            data={serviceCentersData}
            dataKeys={["bookings", "revenue"]}
            labelKey="centerName"
            showXAxis
            showYAxis
            config={{
              bookings: {
                label: "Bookings",
                color: "#c4b5fd",
              },
              revenue: {
                label: "Revenue",
                color: "#8b5cf6",
              },
            }}
          />
        </div>
      </MainContentLayout>
    </div>
  );
}
