import { useController, type Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { CreateBookingFormValues } from "../../lib/schema";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { useRef } from "react";

interface DateTimeSelectorProps {
  control: Control<CreateBookingFormValues>;
}

export default function DateTimeSelector({ control }: DateTimeSelectorProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "bookingDate",
    control,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const inputValue = field.value
    ? dayjs(field.value).format("YYYY-MM-DDTHH:mm")
    : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Convert to UTC
    field.onChange(value ? new Date(value) : undefined);
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        Appointment Date & Time <span className="text-destructive">*</span>
      </Label>

      <div
        className="relative cursor-pointer"
        onClick={handleContainerClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleContainerClick();
          }
        }}
      >
        <Input
          type="datetime-local"
          {...field}
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          min={dayjs().format("YYYY-MM-DDTHH:mm")}
          className={cn(
            "w-full h-10 pr-10",
            error &&
              "border-destructive focus:border-destructive ring-1 ring-destructive/20",
            "[&::-webkit-calendar-picker-indicator]:hidden",
            "focus:outline-none focus:ring-0 focus-visible:ring-0"
          )}
          aria-invalid={!!error}
          aria-describedby={error ? "booking-date-error" : undefined}
        />
        <Calendar
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      {error && (
        <p id="booking-date-error" className="text-xs text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
}
