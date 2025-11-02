import { useState, useEffect, useMemo } from "react";
import { Calendar, dayjsLocalizer, Views, type View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import "@/pages/shifts/employee/components/calendarView.css";
import { useGetWorkSchedulesList } from "@/services/shift/queries";
import type { WorkSchedule } from "@/types/models/shift";
import { Skeleton } from "@/components/ui/skeleton";

const localizer = dayjsLocalizer(dayjs);

export default function CalendarView({ employeeId }: { employeeId: string }) {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<WorkSchedule | null>(null);

  const { data: apiData, isLoading } = useGetWorkSchedulesList({
    page: 1,
    pageSize: 1000,
    employeeId,
  });

  const events = useMemo(() => {
    if (!apiData?.data) return [];

    return apiData.data.map((item: WorkSchedule) => ({
      id: item.id,
      title: `${item.shift.name} (${item.shift.serviceCenter.name})`,
      start: new Date(`${item.date}T${item.shift.startTime}`),
      end: new Date(`${item.date}T${item.shift.endTime}`),
      allDay: false,
      raw: item,
    }));
  }, [apiData]);

  useEffect(() => {
    let fromDate: Date;
    let toDate: Date;

    switch (view) {
      case Views.DAY:
        fromDate = dayjs(date).startOf("day").toDate();
        toDate = dayjs(date).endOf("day").toDate();
        break;
      case Views.WEEK:
        fromDate = dayjs(date).startOf("week").toDate();
        toDate = dayjs(date).endOf("week").toDate();
        break;
      case Views.MONTH:
        fromDate = dayjs(date).startOf("month").toDate();
        toDate = dayjs(date).endOf("month").toDate();
        break;
      default:
        fromDate = dayjs(date).startOf("week").toDate();
        toDate = dayjs(date).endOf("week").toDate();
    }

    console.log("Current View:", view);
    console.log("From:", fromDate, "To:", toDate);
  }, [view, date]);

  return (
    <>
      <Card className="w-full h-full grid min-h-[600px]">
        <CardContent className="p-2">
          <div className="h-[600px] w-full overflow-hidden">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : (
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                style={{ height: "100%" }}
                view={view}
                date={currentDate}
                onView={setView}
                onNavigate={(newDate) => {
                  setDate(newDate);
                  setCurrentDate(newDate);
                }}
                views={[Views.DAY, Views.WEEK, Views.MONTH]}
                onSelectEvent={(event) => setSelectedEvent(event.raw)}
                components={{
                  event: ({ event }) => (
                    <div className="truncate px-1 text-[13px] font-medium cursor-pointer">
                      {event.title}
                    </div>
                  ),
                }}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal detail */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="max-w-md font-inter">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.shift.name}</DialogTitle>
                <DialogDescription>
                  {selectedEvent.shift.serviceCenter.name}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 mt-2 text-sm">
                <p>
                  <strong>Date:</strong>{" "}
                  {dayjs(selectedEvent.date).format("DD/MM/YYYY")}
                </p>
                <p>
                  <strong>Time:</strong> {selectedEvent.shift.startTime} -{" "}
                  {selectedEvent.shift.endTime}
                </p>
                <p>
                  <strong>Service Center:</strong>{" "}
                  {selectedEvent.shift.serviceCenter.name}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {selectedEvent.shift.serviceCenter.address}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
