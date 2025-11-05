import { Skeleton } from "@/components/ui/skeleton";
import type { CustomerDashboardData } from "@/types/models/dashboard";
import { Calendar, PlayCircle, Clock, CheckCircle } from "lucide-react";
import TotalCardCustomer from "./TotalCardCustomer";

export default function OverviewCardCustomer({
  data,
  isLoading,
}: {
  data: CustomerDashboardData | undefined;
  isLoading: boolean;
}) {
  console.log("🚀 ~ OverviewCustomer ~ data:", data);
  const statusList = data?.bookingStatusSummary ?? [];

  const pending = statusList.find((s) => s.status === "PENDING")?.count ?? 0;
  const inProgress =
    statusList.find((s) => s.status === "IN_PROGRESS")?.count ?? 0;
  const completed =
    statusList.find((s) => s.status === "COMPLETED")?.count ?? 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 font-inter">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 p-4 rounded-2xl bg-white dark:bg-[#1e1e1e] shadow-sm border border-gray-200 dark:border-[#2b2b2b]"
          >
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-8 w-2/3" />
          </div>
        ))
      ) : (
        <>
          <TotalCardCustomer
            title="Total Bookings"
            icon={Calendar}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
            numberValue={data?.bookingTotal ?? 0}
          />
          <TotalCardCustomer
            title="Pending"
            icon={Clock}
            bgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            numberValue={pending}
          />
          <TotalCardCustomer
            title="In Progress"
            icon={PlayCircle}
            bgColor="bg-teal-100"
            iconColor="text-teal-600"
            numberValue={inProgress}
          />
          <TotalCardCustomer
            title="Completed"
            icon={CheckCircle}
             bgColor="bg-green-100"
            iconColor="text-green-600"
            numberValue={completed}
          />
        </>
      )}
    </div>
  );
}
