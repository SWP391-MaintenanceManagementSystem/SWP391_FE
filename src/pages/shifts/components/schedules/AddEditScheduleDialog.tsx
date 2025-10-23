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
import type { ServiceCenter } from "@/types/models/center";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface AddEditScheduleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: WorkScheduleFormData) => void;
  item?: WorkSchedule | null;
  shiftList: Shift[];
  centerList?: ServiceCenter[];
  form: ReturnType<typeof useForm<WorkScheduleFormData>>;
  selectedDate?: Date | null;
}

export function AddEditScheduleDialog({
  open,
  onOpenChange,
  onConfirm,
  item,
  shiftList,
  centerList,
  form,
  selectedDate,
}: AddEditScheduleProps) {
  const { watch } = form;
  const { data: employeesList } = useGetEmployeesQuery();

  const selectedEmployeeId = watch("employeeId");
  const selectedEmployee = useMemo(
    () => employeesList?.find((e) => e.id === selectedEmployeeId),
    [employeesList, selectedEmployeeId],
  );
  const centerId = watch("centerId");

  const filteredShifts = useMemo(() => {
    const effectiveCenterId = centerId || selectedEmployee?.workCenter?.id;
    if (!effectiveCenterId) return [];
    return shiftList.filter(
      (shift) =>
        shift.serviceCenter?.id === effectiveCenterId &&
        shift.status === "ACTIVE",
    );
  }, [centerId, selectedEmployee, shiftList]);

  // Date states
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date | undefined>();

  // --- Sync date when dialog opens ---
  useEffect(() => {
    if (open) {
      let defaultDate: Date | undefined;

      if (selectedDate) {
        defaultDate = selectedDate;
      } else if (item?.date) {
        defaultDate = new Date(item.date);
      }

      if (defaultDate) {
        const formatted = dayjs(defaultDate).format("YYYY-MM-DD");
        form.setValue("date", formatted);
        setDate(defaultDate);
        setMonth(defaultDate);
      } else {
        setDate(undefined);
        setMonth(undefined);
        form.setValue("date", "");
      }
    }
  }, [open, item, selectedDate, form]);

  const formatDateForInput = (d?: Date) =>
    d ? dayjs(d).format("DD-MM-YYYY") : "";
  const formatDateForValue = (d?: Date) =>
    d ? dayjs(d).format("YYYY-MM-DD") : "";

  const onSubmit = async (values: WorkScheduleFormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    onConfirm(values);
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset(item ? { ...item } : {});
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
            className="grid grid-cols-1 gap-4 max-h-[360px] overflow-y-auto"
          >
            {!item && (
              <FormField
                control={form.control}
                name="centerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Center *</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          className={`w-full border ${
                            form.formState.errors.centerId
                              ? "border-destructive focus:ring-destructive"
                              : "border-input focus:ring-primary"
                          }`}
                        >
                          <Button
                            variant="outline"
                            className="w-full !outline-none flex justify-between"
                          >
                            <span>
                              {centerList?.find((c) => c.id === field.value)
                                ?.name ?? "Select Center"}
                            </span>
                            <ChevronDown className="mr-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {centerList?.map((center) => (
                            <DropdownMenuItem
                              key={center.id}
                              onSelect={() => field.onChange(center.id)}
                            >
                              {center.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Employee Selector */}
            <EmployeeSelector
              form={form}
              disabled={!form.watch("centerId")}
              employees={
                employeesList
                  ?.filter((emp) => emp.status === "VERIFIED")
                  .filter(
                    (emp) => emp.workCenter?.id === form.watch("centerId"),
                  ) || []
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
                    disabled={!form.watch("centerId") && !selectedEmployee}
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
                      {!selectedEmployee && !centerId ? (
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
              render={() =>
                selectedDate ? (
                  <FormItem>
                    <FormLabel>Selected Date *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        value={dayjs(selectedDate).format("DD-MM-YYYY")}
                        readOnly
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) : (
                  <FormItem>
                    <FormLabel>Select Date *</FormLabel>
                    <FormControl>
                      <div className="relative flex gap-2">
                        <Input
                          id="date"
                          value={formatDateForInput(date)}
                          placeholder="dd-mm-yyyy"
                          readOnly
                          aria-invalid={!!form.formState.errors.date}
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
                                form.setValue(
                                  "date",
                                  formatDateForValue(localDate),
                                ); // yyyy-mm-dd
                                setOpenDate(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
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
