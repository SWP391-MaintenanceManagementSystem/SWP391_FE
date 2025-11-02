import { useGetAdminOverview } from "@/services/dashboard/queries/admin";
import TotalCard from "./TotalCard";
import { HandCoinsIcon, Hotel, IdCardLanyard, User2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export function OverviewAdmin() {
  const { data, isLoading } = useGetAdminOverview();

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 md:gap-4 font-inter">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 p-4 rounded-2xl bg-white shadow-sm border animate-pulse"
          >
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-8 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 md:gap-4 font-inter h-auto">
      <TotalCard
        title="Total Revenue"
        icon={HandCoinsIcon}
        numberValue={
          data?.totalRevenue?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }) ?? "N/A"
        }
      />
      <NavLink to="/vehicles">
        <TotalCard
          title="Total Customer"
          icon={User2}
          numberValue={data?.totalCustomers ?? "N/A"}
        />
      </NavLink>
      <NavLink to="/employees/staffs">
        <TotalCard
          title="Total Employee"
          icon={IdCardLanyard}
          numberValue={data?.totalEmployees ?? "N/A"}
        />
      </NavLink>
      <TotalCard
        title="Total Service Center"
        icon={Hotel}
        numberValue={data?.totalServiceCenters ?? "N/A"}
      />
    </div>
  );
}
