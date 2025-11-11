import { useState } from "react";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddScheduleDialog } from "./AddScheduleDialog";
import type { UseFormReturn } from "react-hook-form";
import type { AddWorkScheduleFormData } from "../../libs/schema";
import { useGetShiftsQuery } from "@/services/shift/queries";
import { useGetServiceCenterList } from "@/services/manager/queries";
import { toast } from "sonner";
import { useEffect } from "react";

const localizer = dayjsLocalizer(dayjs);

interface ScheduleCalendarProps {
  form: UseFormReturn<AddWorkScheduleFormData>;
  onConfirm: (data: AddWorkScheduleFormData) => void;
  isPending: boolean;
  isSuccess: boolean;
}

export default function ScheduleCalendar({
  form,
  onConfirm,
  isPending,
  isSuccess,
}: ScheduleCalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: shiftsData } = useGetShiftsQuery();
  const shiftsList = shiftsData ?? [];
  const { data: centerListData } = useGetServiceCenterList();
  const centerList = centerListData ?? [];
  const handleAddSchedule = (data: AddWorkScheduleFormData) => {
    onConfirm(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
    }
  }, [isSuccess, form]);

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Schedule Calendar
          </CardTitle>

          <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
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
            date={currentDate}
            onNavigate={setCurrentDate}
            views={{ month: true }}
            onSelectSlot={(slotInfo) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (slotInfo.start < today) {
                toast.warning("Cannot schedule in the past");
                return;
              }
              setSelectedDate(slotInfo.start);
              setIsModalOpen(true);
            }}
          />
        </CardContent>
      </Card>

      <AddScheduleDialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            setSelectedDate(null);
          }
        }}
        onConfirm={(data) => {
          handleAddSchedule(data);
        }}
        form={form}
        selectedDate={selectedDate}
        shiftList={shiftsList}
        centerList={centerList}
        isPending={isPending}
      />
    </>
  );
}
