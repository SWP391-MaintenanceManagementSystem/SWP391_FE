import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";

interface Calendar22Props {
  value?: Date;
  onChange?: (date: Date) => void;
  title?: string;
}

export function Calendar22({ value, onChange, title }: Calendar22Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-3 ">
      <Label htmlFor="date" className="px-1">
        {title}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal w-full"
          >
            {date ? dayjs(date).format("DD/MM/YYYY") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              onChange?.(selectedDate ?? new Date());
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
