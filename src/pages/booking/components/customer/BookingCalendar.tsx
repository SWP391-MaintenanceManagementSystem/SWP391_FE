import { useState } from "react";
import { Calendar, dayjsLocalizer, Views, type View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BookingModal from "./BookingModal";

const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    title: "Bảo dưỡng xe A",
    start: new Date(2025, 9, 4, 9, 0),
    end: new Date(2025, 9, 4, 10, 30),
  },
];

const BookingCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleSelectSlot = (slotInfo: any) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setIsModalOpen(true);
  };

  return (
    <div style={{ height: "90vh", padding: "10px" }} className="font-inter">
      <div className="flex justify-end mb-2 ">
        <Button className="bg-purple-primary" onClick={() => setIsModalOpen(true)}>
          <Plus />
          Booking
        </Button>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        selectable
        onSelectSlot={handleSelectSlot}
        view={view}
        onView={(v) => setView(v)} // cho phép đổi view
        date={date}
        onNavigate={(newDate) => setDate(newDate)} // cho phép next / prev
        views={[Views.DAY, Views.WEEK, Views.MONTH]} // bật các view
        defaultView={Views.WEEK}
        popup
      />

      {/* Modal đơn giản */}
      {isModalOpen && (
        <BookingModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BookingCalendar;
