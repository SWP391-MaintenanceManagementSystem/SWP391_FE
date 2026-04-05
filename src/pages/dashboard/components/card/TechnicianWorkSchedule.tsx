import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Wrench, Clock, MapPin } from "lucide-react";
import { useGetWorkScheduleByEmpId } from "@/services/shift/queries";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export default function TechnicianWorkSchedule({
  technicianId,
}: {
  technicianId: string;
}) {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());
  const { data, isLoading } = useGetWorkScheduleByEmpId(technicianId);

  const events = useMemo(() => {
    const raw = (data as any) ?? [];
    return raw.map((item: any) => ({
      date: item.date,
      time: `${item.shift.startTime.slice(0, 5)} - ${item.shift.endTime.slice(0, 5)}`,
      centerName: item.shift.serviceCenter.name,
    }));
  }, [data]);

  const selectedEvents = events.filter(
    (e: any) => e.date === format(date, "yyyy-MM-dd")
  );

  return (
    <Card className="shadow-sm h-full gap-4 border border-gray-200 dark:border-[#2b2b2b] rounded-xl w-full">
      {isLoading ? (
        <>
          <CardHeader className="flex items-center space-x-3">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 items-start">
            <Skeleton className="w-full h-[280px] rounded-md" />
            <div className="space-y-3">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-full h-16 rounded-md" />
              <Skeleton className="w-full h-16 rounded-md" />
            </div>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="flex items-center gap-1.5">
            <Wrench size={20} />
            <CardTitle>{t("technician.technician_schedule")}</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
            <div className="relative">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate as any}
                required
                className="
                  rounded-md border
                  [&_[data-selected-single='true']]:bg-blue-600
                  [&_[data-selected-single='true']]:text-white
                  [&_[data-selected-single='true']]:border-2
                  [&_[data-selected-single='true']:hover]:bg-blue-500
                "
                modifiers={{
                  oneShift: (day: Date) => {
                    const dayStr = format(day, "yyyy-MM-dd");
                    return events.filter((e: any) => e.date === dayStr).length === 1;
                  },
                  twoShifts: (day: Date) => {
                    const dayStr = format(day, "yyyy-MM-dd");
                    return events.filter((e: any) => e.date === dayStr).length >= 2;
                  },
                }}
                modifiersClassNames={{
                  oneShift:
                    "relative after:content-[''] after:w-1 after:h-1 after:bg-yellow-500 after:rounded-full after:absolute after:bottom-[3px] after:left-1/2 after:-translate-x-1/2",
                  twoShifts:
                    "relative after:content-[''] after:w-1 after:h-1 after:bg-yellow-500 after:rounded-full after:absolute after:bottom-[3px] after:left-[45%] after:-translate-x-1/2 " +
                    "before:content-[''] before:w-1 before:h-1 before:bg-red-500 before:rounded-full before:absolute before:bottom-[3px] before:left-[55%] before:-translate-x-1/2",
                }}
              />
            </div>

            <div className="flex flex-col h-full max-h-[300px] overflow-hidden">
              <h3 className="text-sm font-medium mb-2">
                {t("technician.shifts_on", { date: format(date, "dd MMM yyyy") })}
              </h3>

              {selectedEvents.length > 0 ? (
                <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                  {selectedEvents.map((event: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl space-y-1.5 bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-700 text-sm font-medium"
                    >
                      <div className="flex items-center">
                        <Clock className="mr-2" size={16} />
                        <Badge variant="outline">{event.time}</Badge>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2" size={18} />
                        {event.centerName}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t("technician.no_shifts")}
                </p>
              )}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
