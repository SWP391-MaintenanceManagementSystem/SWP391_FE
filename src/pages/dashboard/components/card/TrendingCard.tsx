import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TrendingServicesDonutChart } from "../chart/TrendingServices";
import { TrendingPackagesDonutChart } from "../chart/TrendingPackages";
import { TrendingMembershipDonutChart } from "../chart/TrendingMembership";
import { useGetTrendingPurchase } from "@/services/dashboard/queries/admin";
import type { ServiceData } from "@/types/models/dashboard";
import { TooltipWrapper } from "@/components/TooltipWrapper";

type DetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  items: ServiceData[];
};

const DetailsDialog = ({
  open,
  onOpenChange,
  title,
  items,
}: DetailDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          Showing all top {title.toLowerCase()} customers preferred.
        </DialogDescription>
      </DialogHeader>
      <ul className="mt-2 space-y-2">
        {items?.length > 0 ? (
          items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between text-sm border-b pb-1 border-gray-200 dark:border-gray-700"
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {item.name ?? item.name ?? "Unnamed"}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {item.value ?? ""}
              </span>
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

export function TrendingPurchaseCard() {
  const { data, isLoading } = useGetTrendingPurchase();
  const [dialog, setDialog] = React.useState<{
    open: boolean;
    type: "services" | "packages" | "memberships" | null;
  }>({ open: false, type: null });

  const handleOpen = (type: "services" | "packages" | "memberships") =>
    setDialog({ open: true, type });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-80 mt-2" />
          </CardDescription>
        </CardHeader>

        <CardContent className="grid xl:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 items-center ${
                i === 2
                  ? "border-l border-r border-gray-200 dark:border-gray-700 px-4"
                  : ""
              }`}
            >
              <Skeleton className="h-40 w-40 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const currentData =
    dialog.type === "services"
      ? (data?.services ?? [])
      : dialog.type === "packages"
        ? (data?.packages ?? [])
        : dialog.type === "memberships"
          ? (data?.memberships ?? [])
          : [];

  const currentTitle =
    dialog.type === "services"
      ? "Services List"
      : dialog.type === "packages"
        ? "Packages List"
        : dialog.type === "memberships"
          ? "Memberships List"
          : "";

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Customer Purchase Trends</CardTitle>
          <CardDescription>
            Understand customer behavior through top-purchased services and
            packages.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid xl:grid-cols-3 gap-8">
          {/* Services */}
          <div className="flex flex-col gap-1 items-center">
            <TrendingServicesDonutChart data={data?.services ?? []} />
            <TooltipWrapper content="View List">
              <Badge
                variant="outline"
                className="text-xs font-medium cursor-pointer"
                onClick={() => handleOpen("services")}
              >
                Services
              </Badge>
            </TooltipWrapper>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Top service:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {data?.mostPopularService}
              </span>
            </p>
          </div>

          {/* Packages */}
          <div className="flex flex-col gap-1 items-center border-l border-r border-gray-200 dark:border-gray-700 px-4">
            <TrendingPackagesDonutChart data={data?.packages ?? []} />
            <TooltipWrapper content="View List">
              <Badge
                variant="outline"
                className="text-xs font-medium cursor-pointer"
                onClick={() => handleOpen("packages")}
              >
                Maintenance Packages
              </Badge>
            </TooltipWrapper>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Most chosen:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {data?.mostPopularPackage}
              </span>
            </p>
          </div>

          {/* Membership */}
          <div className="flex flex-col items-center gap-1">
            <TrendingMembershipDonutChart data={data?.memberships ?? []} />
            <TooltipWrapper content="View List">
              <Badge
                variant="outline"
                className="text-xs font-medium cursor-pointer"
                onClick={() => handleOpen("memberships")}
              >
                Membership Plans
              </Badge>
            </TooltipWrapper>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Top tier:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {data?.mostPopularMembership}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <DetailsDialog
        open={dialog.open}
        onOpenChange={(open) => setDialog({ ...dialog, open })}
        title={currentTitle}
        items={currentData}
      />
    </>
  );
}
