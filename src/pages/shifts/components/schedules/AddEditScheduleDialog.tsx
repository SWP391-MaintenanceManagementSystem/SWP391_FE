import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import type { WorkScheduleFormData } from "../../libs/schema";
import type { Shift, WorkSchedule } from "@/types/models/shift";
import EmployeeSelector from "./EmployeeSelector";
import { useGetEmployeesQuery } from "@/services/shift/queries";
import clsx from "clsx";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import dayjs from "dayjs";

interface AddEditScheduleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: WorkScheduleFormData) => void;
  item?: WorkSchedule | null;
  shiftList: Shift[];
  form: ReturnType<typeof useForm<WorkScheduleFormData>>;
}

export function AddEditScheduleDialog({
  open,
  onOpenChange,
  onConfirm,
  item,
  shiftList,
  form,
}: AddEditScheduleProps) {
  const { watch } = form;
  const { data: employeesList } = useGetEmployeesQuery();

  const selectedEmployeeId = watch("employeeId");
  const selectedEmployee = useMemo(
    () => employeesList?.find((e) => e.id === selectedEmployeeId),
    [employeesList, selectedEmployeeId],
  );

  const filteredShifts = useMemo(() => {
    const centerId = selectedEmployee?.workCenter?.id;
    if (!centerId) return [];
    return shiftList.filter(
      (shift) =>
        shift.serviceCenter?.id === centerId && shift.status === "ACTIVE",
    );
  }, [selectedEmployee, shiftList]);

  // Date field states
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    item?.date ? new Date(item.date) : undefined,
  );
  const [month, setMonth] = useState<Date | undefined>(
    item?.date ? new Date(item.date) : undefined,
  );
  const [value, setValue] = useState(
    item?.date ? dayjs(item.date).format("YYYY-MM-DD") : "",
  );

  // Reset local date when opening or when item changes
  useEffect(() => {
    if (open) {
      const defaultDate = item?.date ? new Date(item.date) : undefined;
      setDate(defaultDate);
      setMonth(defaultDate);
      setValue(item?.date ? dayjs(item.date).format("YYYY-MM-DD") : "");
    }
  }, [open, item]);

  const isValidDate = (d: Date) => d instanceof Date && !isNaN(d.getTime());
  const formatDate = (d?: Date) => (d ? dayjs(d).format("YYYY-MM-DD") : "");

  const onSubmit = async (values: WorkScheduleFormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    onConfirm(values);
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset(item ? { ...item } : {});
    const defaultDate = item?.date ? new Date(item.date) : undefined;
    setDate(defaultDate);
    setMonth(defaultDate);
    setValue(item?.date ? dayjs(item.date).format("YYYY-MM-DD") : "");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] font-inter"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {item ? "Edit Schedule" : "Add New Schedule"}
          </DialogTitle>
          <DialogDescription>
            {item
              ? "Update the schedule details below."
              : "Enter the details for the new schedule."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={clsx(
              "grid grid-cols-1 gap-4 max-h-[360px] overflow-y-auto",
            )}
          >
            {/* Employee Selector */}
            <EmployeeSelector
              form={form}
              employees={
                employeesList?.filter((emp) => emp.status === "VERIFIED") || []
              }
            />

            {/* Shift Field */}
            <FormField
              control={form.control}
              name="shiftId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shift *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedEmployee}
                    aria-invalid={!!form.formState.errors.shiftId}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={clsx(
                          "w-full",
                          form.formState.errors.shiftId &&
                            "border-destructive focus:ring-destructive",
                        )}
                      >
                        <SelectValue placeholder="Select shift" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!selectedEmployee ? (
                        <SelectItem value="none" disabled>
                          Please select an employee first
                        </SelectItem>
                      ) : filteredShifts.length > 0 ? (
                        filteredShifts.map((shift) => (
                          <SelectItem key={shift.id} value={shift.id}>
                            {shift.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No shifts available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Field */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Date *</FormLabel>
                  <FormControl>
                    <div className="relative flex gap-2">
                      <Input
                        id="date"
                        value={value}
                        placeholder="YYYY-MM-DD"
                        aria-invalid={!!form.formState.errors.date}
                        onChange={(e) => {
                          const inputDate = new Date(e.target.value);
                          setValue(e.target.value);
                          if (isValidDate(inputDate)) {
                            setDate(inputDate);
                            setMonth(inputDate);
                            field.onChange(formatDate(inputDate));
                          }
                        }}
                      />
                      <Popover open={openDate} onOpenChange={setOpenDate}>
                        <PopoverTrigger asChild>
                          <Button
                            id="date-picker"
                            variant="ghost"
                            className={`absolute top-1/2 right-2 size-6 -translate-y-1/2 ${
                              form.formState.errors.date
                                ? "border-destructive focus:ring-destructive"
                                : "border-input focus:ring-primary"
                            }`}
                          >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="end"
                          alignOffset={-8}
                          sideOffset={10}
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(selectedDate) => {
                              if (!selectedDate) return;
                              const localDate = new Date(
                                selectedDate.getFullYear(),
                                selectedDate.getMonth(),
                                selectedDate.getDate(),
                              );
                              setDate(localDate);
                              setValue(formatDate(localDate));
                              field.onChange(formatDate(localDate));
                              setOpenDate(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-primary"
                disabled={!form.formState.isDirty}
              >
                {item ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
