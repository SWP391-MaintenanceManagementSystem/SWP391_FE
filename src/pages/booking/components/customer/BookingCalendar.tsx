import { useState, useEffect, useMemo } from "react";
import { Calendar, dayjsLocalizer, Views, type View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookingModal from "./BookingModal";
import { defaultBookingFilter } from "@/types/models/booking";
import useBooking from "@/services/booking/hooks/useBooking";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const localizer = dayjsLocalizer(dayjs);

const BookingCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState(defaultBookingFilter);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check for mobile responsiveness
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      bookingData?.data?.map((b) => ({
        id: b.id,
        title: `📅 ${b.id}`,
        status: b.status,
        start: new Date(b.bookingDate),
        end: dayjs(b.bookingDate).add(30, "minute").toDate(),
      })) ?? [],
    [bookingData]
  );

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "CANCELLED":
  //       return "bg-destructive text-destructive-foreground";
  //     case "COMPLETED":
  //       return "bg-green-500 text-white";
  //     case "CONFIRMED":
  //       return "bg-blue-500 text-white";
  //     default:
  //       return "bg-yellow-500 text-white";
  //   }
  // };

  const eventStyleGetter = (event: any) => ({
    style: {
      backgroundColor:
        event.status === "CANCELLED"
          ? "#ef4444"
          : event.status === "COMPLETED"
          ? "#10b981"
          : event.status === "CONFIRMED"
          ? "#3b82f6"
          : "#f59e0b",
      borderRadius: "8px",
      color: "white",
      border: "none",
      fontWeight: 500,
      padding: "4px 8px",
    },
  });

  if (isLoading) {
    return (
      <Card className="h-[95vh]">
        <CardHeader>
          <Skeleton className="h-8 w-16" />
        </CardHeader>
        <CardContent className="p-0 h-[calc(95vh-120px)]">
          <div className="p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="h-[95%]">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Bookings Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[--color-purple-primary] hover:bg-[--color-purple-primary]/90 text-white"
            >
              <Plus className="h-4 w-4" />
              {isMobileView ? "Book" : "New Booking"}
            </Button>
          </div>
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
              onSelectSlot={() => setIsModalOpen(true)}
              onSelectEvent={(event) => console.log(event)}
              view={view}
              onView={setView}
              date={date}
              onNavigate={setDate}
              views={[Views.DAY, Views.WEEK, Views.MONTH]}
              popup
              step={15}
              timeslots={4}
              eventPropGetter={eventStyleGetter}
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
