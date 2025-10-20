import { useController, type Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { CreateBookingFormValues } from "../../lib/schema";
import dayjs from "dayjs";

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

  // Format cho datetime-local input
  const inputValue = field.value
    ? dayjs(field.value).format("YYYY-MM-DDTHH:mm")
    : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    field.onChange(value ? new Date(value) : undefined);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        Appointment Date & Time <span className="text-destructive">*</span>
      </Label>

      <Input
        type="datetime-local"
        {...field}
        value={inputValue}
        onChange={handleChange}
        min={dayjs().format("YYYY-MM-DDTHH:mm")}
        className={cn(
          "w-full h-10",
          error &&
            "border-destructive focus:border-destructive ring-1 ring-destructive/20"
        )}
        aria-invalid={!!error}
        aria-describedby={error ? "booking-date-error" : undefined}
      />

      {error && (
        <p id="booking-date-error" className="text-xs text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
}
