import { useTheme } from "@/components/theme/ThemeProvider";
import { ChartPieLegend } from "@/components/charts/ChartPieLegend";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Loader } from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import { useGetStatusStat } from "@/services/manager/queries";
import type { ChartConfig } from "@/components/ui/chart";
import "animate.css";
import AddEmployeeForm from "./AddEmployeeForm";
import { useEmployee } from "@/services/manager/hooks/useEmployee";
import type { EmployeeTable } from "../libs/table-types";

type Props = {
  iconDark: string;
  iconLight: string;
  title: string;
  role: "STAFF" | "TECHNICIAN";
  page: number;
  pageSize: number;
};

export default function TotalBox({
  iconDark,
  iconLight,
  title,
  role,
  page,
  pageSize,
}: Props) {
  const { resolvedTheme } = useTheme();
  const { width = 0 } = useWindowSize();
  const isMobile = (width ?? 0) < 1024;
  const { data, isLoading } = useGetStatusStat(role);
  const total = data?.total;
  const [openAddForm, setOpenAddForm] = useState(false);
  const { form, handleAddEmployee } = useEmployee(
    {} as EmployeeTable,
    role,
    page,
    pageSize,
  );
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
    <Button
      onClick={() => {
        form.reset({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
        setOpenAddForm(true);
      }}
      className="bg-purple-primary text-accent dark:bg-purple-primary-dark dark:text-amber-primary hover:scale-110 transition-transform duration-300"
    >
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

      {!isLoading ? (
        <ChartPieLegend
          chartData={chartData}
          chartConfig={chartConfig}
          nameKey="status"
          dataKey="count"
          maxHeight="max-h-[250px]"
        />
      ) : (
        <div className="animate__animated animate__fadeIn">
          <Loader className="animate-spin" />
        </div>
      )}

      {!isMobile && <AddNewButton />}
      <AddEmployeeForm
        open={openAddForm}
        onOpenChange={(open) => setOpenAddForm(open)}
        form={form}
        onConfirm={async () => {
          const success = await handleAddEmployee();
          console.log(success);
          if (success) {
            setOpenAddForm(false);
          }
        }}
        title="Employee"
      />
    </div>
  );
}
