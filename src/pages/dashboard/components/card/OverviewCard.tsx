import { useGetAdminOverview } from "@/services/dashboard/queries/admin";
import TotalCard from "./TotalCard";
import {
  HandCoinsIcon,
  Hotel,
  IdCardLanyard,
  MessageCircleMore,
  User2,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import type { StaffDashboardData } from "@/types/models/dashboard";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ServiceCenter } from "@/types/models/center";
import { useState } from "react";
import { useGetServiceCenterList } from "@/services/manager/queries";

type DetailCenterListDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ServiceCenter[];
};

const DetailsCenterListDialog = ({
  open,
  onOpenChange,
  items,
}: DetailCenterListDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md ">
      <DialogHeader>
        <DialogTitle>Service Center List</DialogTitle>
      </DialogHeader>
      <ul className="mt-2 space-y-2 max-h-[500px] overflow-y-auto">
        {items?.length > 0 ? (
          items.map((item, index) => (
            <li
              key={index}
              className="flex flex-col justify-between text-sm border-b pb-1 border-gray-200 dark:border-gray-700"
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {item.name ?? item.name ?? "Unnamed"}
              </span>
              <span className="font-medium text-gray-400">{item.address}</span>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No data available.
          </p>
        )}
      </ul>
    </DialogContent>
  </Dialog>
);

export function OverviewAdmin() {
  const { data, isLoading } = useGetAdminOverview();
  const [openCenterList, setOpenCenterList] = useState(false);
  const { data: serviceCenters } = useGetServiceCenterList();

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 md:gap-4 font-inter">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 p-4 rounded-2xl shadow-sm border animate-pulse"
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
          title="Verified Customers"
          icon={User2}
          numberValue={data?.totalCustomers ?? "N/A"}
        />
      </NavLink>
      <NavLink to="/employees/staffs">
        <TotalCard
          title="Verified Employees"
          icon={IdCardLanyard}
          numberValue={data?.totalEmployees ?? "N/A"}
        />
      </NavLink>
      <TooltipWrapper content="View Service Center List">
        <div className="cursor-pointer">
          <TotalCard
            title="Total Service Center"
            icon={Hotel}
            numberValue={data?.totalServiceCenters ?? "N/A"}
            onClick={() => setOpenCenterList(!openCenterList)}
          />
        </div>
      </TooltipWrapper>

      <DetailsCenterListDialog
        open={openCenterList}
        onOpenChange={() => setOpenCenterList(false)}
        items={serviceCenters ?? []}
      />
    </div>
  );
}

export function OverviewStaff({
  data,
  isLoading,
}: {
  data: StaffDashboardData;
  isLoading: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {isLoading ? (
        Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 p-4 rounded-2xl dark:bg-[#1e1e1e] shadow-sm border border-gray-200 dark:border-[#2b2b2b]"
          >
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-8 w-2/3" />
          </div>
        ))
      ) : (
        <>
          <TotalCard
            title="Total Customers"
            icon={Users}
            numberValue={data?.totalCustomers ?? "N/A"}
          />
          <TotalCard
            title="New Tickets"
            icon={MessageCircleMore}
            numberValue={data?.newTickets ?? "N/A"}
          />
        </>
      )}
    </div>
  );
}
