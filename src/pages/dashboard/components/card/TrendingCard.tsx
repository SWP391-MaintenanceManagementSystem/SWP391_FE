import type { ReactElement } from "react";
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
import { ChartPieIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type DialogType = "services" | "packages" | "memberships";

type DetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  items: ServiceData[];
};

const DetailsDialog: React.FC<DetailDialogProps> = ({
  open,
  onOpenChange,
  title,
  items,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {t("dashboard.admin.trending.showing_top", {
              type: title.toLowerCase(),
            })}
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-2 space-y-2">
          {items?.length ? (
            items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between text-sm border-b pb-1 border-gray-200 dark:border-gray-700"
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {item.name ?? t("dashboard.common.unnamed")}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {item.value ?? ""}
                </span>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("dashboard.common.no_data")}
            </p>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export function TrendingPurchaseCard() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetTrendingPurchase();
  const [dialog, setDialog] = React.useState<{
    open: boolean;
    type: DialogType | null;
  }>({ open: false, type: null });

  const renderCardSection = (
    type: DialogType,
    dataItems: ServiceData[],
    chartComponent: ReactElement,
    badgeLabel: string,
    topText?: string,
  ) => {
    const allZero = dataItems.every((item) => item.value === 0);

    return (
      <div className="flex flex-col gap-1 items-center text-center">
        {!allZero ? (
          chartComponent
        ) : (
          <div className="mt-10 flex flex-col items-center text-center">
            <ChartPieIcon height={60} width={60} />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 py-4 text-center">
              {t("dashboard.admin.trending.no_data_analysis")}
            </p>
          </div>
        )}

        <TooltipWrapper content={t("dashboard.admin.trending.view_list")}>
          <Badge
            variant="outline"
            className="text-xs font-medium cursor-pointer"
            onClick={() => setDialog({ open: true, type })}
          >
            {badgeLabel}
          </Badge>
        </TooltipWrapper>

        {!allZero && topText && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{topText}</p>
        )}
      </div>
    );
  };

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
      ? t("dashboard.admin.trending.services_list")
      : dialog.type === "packages"
        ? t("dashboard.admin.trending.packages_list")
        : dialog.type === "memberships"
          ? t("dashboard.admin.trending.memberships_list")
          : "";

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.admin.trending.title")}</CardTitle>
          <CardDescription>
            {t("dashboard.admin.trending.desc")}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid xl:grid-cols-3 gap-8">
          {[
            {
              type: "services" as DialogType,
              dataItems: data?.services ?? [],
              chart: <TrendingServicesDonutChart data={data?.services ?? []} />,
              label: t("dashboard.admin.trending.services"),
              topText: `${
                (data?.mostPopularService?.length ?? 0) > 1
                  ? t("dashboard.admin.trending.top_services")
                  : t("dashboard.admin.trending.top_service")
              } ${data?.mostPopularService?.join(", ") ?? ""}`,
            },
            {
              type: "packages" as DialogType,
              dataItems: data?.packages ?? [],
              chart: <TrendingPackagesDonutChart data={data?.packages ?? []} />,
              label: t("dashboard.admin.trending.packages"),
              topText: `${t("dashboard.admin.trending.most_chosen")} ${data?.mostPopularPackage?.join(", ") ?? ""}`,
            },
            {
              type: "memberships" as DialogType,
              dataItems: data?.memberships ?? [],
              chart: (
                <TrendingMembershipDonutChart data={data?.memberships ?? []} />
              ),
              label: t("dashboard.admin.trending.memberships"),
              topText: `${t("dashboard.admin.trending.top_tier")} ${data?.mostPopularMembership?.join(", ") ?? ""}`,
            },
          ].map((item, index) => (
            <div
              key={item.type}
              className={`flex flex-col gap-1 items-center text-center ${
                index === 1
                  ? "border-l border-r border-gray-200 dark:border-gray-700 px-4"
                  : ""
              }`}
            >
              {renderCardSection(
                item.type,
                item.dataItems,
                item.chart,
                item.label,
                item.topText,
              )}
            </div>
          ))}
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
