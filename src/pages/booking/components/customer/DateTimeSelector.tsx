import { useState } from "react";
import { useController, type Control } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import type { BookingFormValues } from "../../lib/schema";



interface DateTimeSelectorProps {
  control: Control<BookingFormValues>;
}

export default function DateTimeSelector({ control }: DateTimeSelectorProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "dateTime",
    control,
  });

  const initialDate =
    field.value instanceof Date
      ? field.value
      : field.value
      ? new Date(field.value)
      : new Date();

  const [dateOpen, setDateOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(
    dayjs(initialDate).format("HH:mm")
  );

  const updateDateTime = (date: Date | undefined, timeStr: string) => {
    if (!date) return;
    const [h, m] = timeStr.split(":").map(Number);
    const newDate = dayjs(date).hour(h).minute(m).toDate();
    field.onChange(newDate);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        Appointment Date & Time
      </Label>

      <div className="grid grid-cols-2 gap-2">
        {/* Date Picker */}
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal pl-3",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                dayjs(field.value).format("DD MMM YYYY")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={initialDate}
              onSelect={(date) => {
                updateDateTime(date, timeValue);
                setDateOpen(false);
              }}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
            />
          </PopoverContent>
        </Popover>

        {/* Time Picker */}
        <div className="relative">
          <Input
            type="time"
            value={timeValue}
            onChange={(e) => {
              const newTime = e.target.value;
              setTimeValue(newTime);
              updateDateTime(initialDate, newTime);
            }}
            className="hide-time-icon pr-9 hover:bg-muted  hover:border-blue-600"
          />
          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
}
