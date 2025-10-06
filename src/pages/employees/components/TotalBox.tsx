import { useTheme } from "@/components/theme/ThemeProvider";
import { ChartPieLabel } from "@/components/charts/PieChart";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMemo } from "react";
import { useGetStatusStat } from "@/services/manager/queries";
import type { ChartConfig } from "@/components/ui/chart";

type Props = {
  iconDark: string;
  iconLight: string;
  title: string;
  role: "STAFF" | "TECHNICIAN";
};

export default function TotalBox({ iconDark, iconLight, title, role }: Props) {
  const { resolvedTheme } = useTheme();
  const { width = 0 } = useWindowSize();
  const isMobile = (width ?? 0) < 1024;
  const { data } = useGetStatusStat(role);
  const total = data?.total;
  const chartData = useMemo(() => {
    const stats = data?.data || [];
    const mapStatus: Record<string, string> = {
      VERIFIED: "verified",
      NOT_VERIFY: "notVerified",
      DISABLED: "disable",
      BANNED: "banned",
    };

    return stats.map((s) => ({
      status: mapStatus[s.status] ?? s.status.toLowerCase(),
      count: s.count,
      fill: `var(--color-${mapStatus[s.status] ?? s.status.toLowerCase()})`,
    }));
  }, [data]);

  const chartConfig = {
    count: {
      label: title,
    },
    verified: {
      label: "Verified",
      color: "var(--chart-verified)",
    },
    notVerified: {
      label: "Not Verified",
      color: "var(--chart-notVerified)",
    },
    banned: {
      label: "Banned",
      color: "var(--chart-banned)",
    },
    disable: {
      label: "Disable",
      color: "var(--chart-disabled)",
    },
  } satisfies ChartConfig;

  const iconSrc = useMemo(
    () => (resolvedTheme === "dark" ? iconDark : iconLight),
    [resolvedTheme, iconDark, iconLight],
  );

  const AddNewButton = () => (
    <Button className="bg-purple-primary text-accent dark:bg-purple-primary-dark dark:text-amber-primary hover:scale-110 transition-transform duration-300">
      Add new <PlusCircleIcon />
    </Button>
  );

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-12 md:min-w-[298px] font-inter bg-slate-100  p-8 rounded-2xl shadow-md">
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="flex relative items-center justify-center w-26 h-26 p-4 rounded-full bg-purple-primary dark:bg-purple-light">
          <img src={iconSrc} alt={`${title} Icon`} className="w-16 h-16" />
        </div>
        <h3 className="text-lg font-semibold">
          Total {title}: <span className="text-2xl">{total}</span>
        </h3>
        {isMobile && <AddNewButton />}
      </div>

      <ChartPieLabel
        chartData={chartData}
        chartConfig={chartConfig}
        nameKey="status"
        dataKey="count"
      />

      {!isMobile && <AddNewButton />}
    </div>
  );
}
