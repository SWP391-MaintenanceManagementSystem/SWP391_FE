import { useState, useEffect, useMemo } from "react";
import { Calendar, dayjsLocalizer, Views, type View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import BookingModal from "./BookingModal";
import { defaultBookingFilter } from "@/types/models/booking";
import useBooking from "@/services/booking/hooks/useBooking";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomEvent, type CalendarEvent } from "./CustomEvent";
import Loading from "@/components/Loading";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const localizer = dayjsLocalizer(dayjs);

const BookingCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState(defaultBookingFilter);

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

    setFilter((prev) => ({
      ...prev,
      fromDate,
      toDate,
    }));
  }, [view, date]);

  const { bookingData, isLoading } = useBooking(filter);
  const events = useMemo(
    () =>
      bookingData?.data
        ?.filter((b) => b.status !== "CANCELLED")
        .map((b) => {
          return {
            id: b.id,
            title: `${b.id}`,
            status: b.status,
            start: new Date(b.bookingDate),
            end: dayjs(b.bookingDate).add(30, "minute").toDate(),
          };
        }) ?? [],
    [bookingData]
  );

  if (isLoading) {
    return (
      <div className=" p-6 flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor;

    switch (event.status) {
      case "CANCELLED":
        backgroundColor = "#ef4444";
        break;
      case "COMPLETED":
        backgroundColor = "#10b981";
        break;
      case "ASSIGNED":
        backgroundColor = "#3b82f6";
        break;
      case "PENDING":
      default:
        backgroundColor = "#f59e0b";
        break;
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <div className="h-[95%] font-inter">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex items-center justify-between p-4 pb-2">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Bookings Calendar
          </CardTitle>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-purple-primary hover:bg-purple-600 text-white dark:text-black"
          >
            <Plus className="h-4 w-4" />
            Booking
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <div className="h-full">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              selectable
              popup
              step={15}
              timeslots={4}
              eventPropGetter={eventStyleGetter}
              view={view}
              onView={setView}
              date={date}
              onNavigate={setDate}
              views={[Views.DAY, Views.WEEK, Views.MONTH]}
              onSelectSlot={() => setIsModalOpen(true)}
              onSelectEvent={(event) => console.log(event)}
              onShowMore={(events, date) => {
                setDate(date);
                setView(Views.DAY);
              }}
              components={{
                event: CustomEvent,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="py-5">
        <BookingModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default BookingCalendar;
