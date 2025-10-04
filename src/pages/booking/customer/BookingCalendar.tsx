import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    title: "Bảo dưỡng xe A",
    start: new Date(2025, 9, 4, 9, 0),
    end: new Date(2025, 9, 4, 10, 30),
  },
  {
    title: "Khách B đặt lịch",
    start: new Date(2025, 9, 5, 13, 0),
    end: new Date(2025, 9, 5, 14, 0),
  },
];

const BookingCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  console.log("🚀 ~ BookingCalendar ~ selectedSlot:", selectedSlot)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectSlot = (slotInfo: any) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setIsModalOpen(true); // mở modal
  };

  return (
    <div style={{ height: "100%" }} className="font-inter">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        defaultView="week"
        selectable
        onSelectSlot={handleSelectSlot}
      />

      {/* Modal đơn giản */}
      {isModalOpen && selectedSlot && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <h3>Xác nhận đặt lịch</h3>
          <p>
            Bạn đã chọn: <br />
            <b>Bắt đầu:</b> {dayjs(selectedSlot.start).format("HH:mm DD/MM/YYYY")} <br />
            <b>Kết thúc:</b> {dayjs(selectedSlot.end).format("HH:mm DD/MM/YYYY")}
          </p>
          <button onClick={() => setIsModalOpen(false)}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
