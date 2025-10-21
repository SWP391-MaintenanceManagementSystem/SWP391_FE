import { useState } from "react";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const localizer = dayjsLocalizer(dayjs);

const ScheduleCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Schedule Calendar
        </CardTitle>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-purple-primary hover:bg-purple-600 text-white dark:text-black"
        >
          <Plus className="h-4 w-4" />
          Add Schedule
        </Button>
      </CardHeader>

      <CardContent className="flex-1">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          selectable
          popup
          view={Views.MONTH}
          date={date}
          onNavigate={setDate}
          views={{ month: true }}
          onSelectSlot={(slotInfo) => {
            setIsModalOpen(true);
            console.log("Selected date:", slotInfo.start);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ScheduleCalendar;
