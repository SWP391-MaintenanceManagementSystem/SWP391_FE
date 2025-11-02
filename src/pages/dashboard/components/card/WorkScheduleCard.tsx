import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarCheck, Clock, MapPin } from "lucide-react";
import { useGetWorkScheduleByEmpId } from "@/services/shift/queries";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function WeeklyWorkSchedule({
  employeeId,
}: {
  employeeId: string;
}) {
  const [date, setDate] = useState(new Date());
  const { data, isLoading } = useGetWorkScheduleByEmpId(employeeId);

  const events = useMemo(() => {
    const raw = data ?? [];
    return raw.map((item) => ({
      date: item.date,
      time: `${item.shift.startTime.slice(0, 5)} - ${item.shift.endTime.slice(0, 5)}`,
      centerName: item.shift.serviceCenter.name,
    }));
  }, [data]);

  const eventDates = events.map((e) => e.date);
  const selectedEvents = events.filter(
    (e) => e.date === format(date, "yyyy-MM-dd"),
  );

  return (
    <Card className="shadow-sm gap-4 border border-gray-200 dark:border-[#2b2b2b] rounded-xl lg:w-[300px]">
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
            <CalendarCheck size={20} />
            <CardTitle>Work Schedule</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 items-start">
            <div className="relative">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                required
                className="
                   rounded-md border
                   [&_[data-selected-single='true']]:bg-purple-primary-dark
                   [&_[data-selected-single='true']]:text-amber-primary
                   [&_[data-selected-single='true']]:border-2
                   [&_[data-selected-single='true']:hover]:bg-purple-primary
                   [&_[data-selected-single='true']:hover]:text-white
                 "
                modifiers={{
                  eventDay: (day) =>
                    eventDates.includes(format(day, "yyyy-MM-dd")),
                }}
                modifiersClassNames={{
                  eventDay:
                    "relative after:content-[''] after:w-1 after:h-1 after:bg-red-500 after:rounded-full after:absolute after:bottom-1/10 after:left-1/2 after:-translate-x-1/2",
                }}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">
                Events on {format(date, "dd MMM yyyy")}
              </h3>

              {selectedEvents.length > 0 ? (
                <div className="space-y-2 overflow-y-auto max-h-[100px]">
                  {selectedEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl space-y-1.5 bg-purple-50 dark:bg-purple-900/40 border border-purple-100 dark:border-purple-700 text-sm font-medium"
                    >
                      <div className="flex items-center">
                        <Clock className="mr-2 text-gray-500" size={16} />
                        <Badge variant="outline">{event.time}</Badge>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 text-gray-500" size={18} />
                        {event.centerName}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No events for this day.
                </p>
              )}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
