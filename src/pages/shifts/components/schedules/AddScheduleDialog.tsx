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
import type { AddWorkScheduleFormData } from "../../libs/schema";
import type { Shift } from "@/types/models/shift";
import { useGetEmployeesQuery } from "@/services/shift/queries";
import clsx from "clsx";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronDown } from "lucide-react";
import dayjs from "dayjs";
import type { ServiceCenter } from "@/types/models/center";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MultiEmployeeSelector from "./MultiEmployeeSelector";
import { useEmployeesSearch } from "@/services/manager/hooks/useEmployeeSearch";

interface AddScheduleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: AddWorkScheduleFormData) => void;
  shiftList: Shift[];
  centerList?: ServiceCenter[];
  form: ReturnType<typeof useForm<AddWorkScheduleFormData>>;
  selectedDate?: Date | null;
  isPending: boolean;
}

export function AddScheduleDialog({
  open,
  onOpenChange,
  onConfirm,
  shiftList,
  centerList,
  form,
  selectedDate,
  isPending,
}: AddScheduleProps) {
  const { watch } = form;
  const { data: employeesList } = useGetEmployeesQuery();
  const [initialized, setInitialized] = useState(false);
  const { keyword, setKeyword, data, isLoading } = useEmployeesSearch({
    centerId: watch("centerId"),
  });

  useEffect(() => {
    if (open && !initialized) {
      form.setValue("employeeIds", []);
      setKeyword("");
      setInitialized(true);
    }
    if (!open) {
      setInitialized(false);
    }
  }, [open, form, setKeyword, initialized]);

  const selectedEmployeeIds = watch("employeeIds");
  const selectedEmployee = useMemo(
    () => employeesList?.find((e) => e.id === selectedEmployeeIds[0]),
    [employeesList, selectedEmployeeIds],
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

  // ---- Separate date states ----
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [startMonth, setStartMonth] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [endMonth, setEndMonth] = useState<Date | undefined>();

  // --- Sync selectedDate for startDate only ---
  useEffect(() => {
    if (open) {
      if (selectedDate) {
        const formatted = dayjs(selectedDate).format("YYYY-MM-DD");
        form.setValue("startDate", formatted);
        setStartDate(selectedDate);
        setStartMonth(selectedDate);
      } else {
        setStartDate(undefined);
        setStartMonth(undefined);
        form.setValue("startDate", "");
      }
    }
  }, [open, selectedDate, form]);

  const formatDateForInput = (d?: Date) =>
    d ? dayjs(d).format("DD-MM-YYYY") : "";
  const formatDateForValue = (d?: Date) =>
    d ? dayjs(d).format("YYYY-MM-DD") : "";

  const onSubmit = async (values: AddWorkScheduleFormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    onConfirm(values);
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newState) => {
        if (!newState) {
          form.reset();
          setKeyword("");
          setInitialized(false);
        }
        onOpenChange(newState);
      }}
    >
      <DialogContent
        className="sm:max-w-[500px] font-inter"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Schedule</DialogTitle>
          <DialogDescription>
            Enter the details for the new schedule.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6"
          >
            <div className="grid grid-cols-1 gap-4 max-h-[320px] overflow-y-auto">
              {/* Center */}
              <FormField
                control={form.control}
                name="centerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Center *</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className={clsx(
                              "w-full justify-between",
                              form.formState.errors.centerId &&
                                "border-destructive focus:ring-destructive",
                            )}
                          >
                            <span>
                              {centerList?.find((c) => c.id === field.value)
                                ?.name ?? "Select Center"}
                            </span>
                            <ChevronDown className="mr-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full" align="start">
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

              {/* Employee Selector */}
              <MultiEmployeeSelector
                form={form}
                fieldName="employeeIds"
                label="Select Employees"
                placeholder="Search email to find employees..."
                keyword={keyword}
                setKeyword={setKeyword}
                data={data}
                isLoading={isLoading}
                disable={!form.watch("centerId")}
              />

              {/* Shift */}
              <FormField
                control={form.control}
                name="shiftId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shift *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!form.watch("centerId")}
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
                        {filteredShifts.length > 0 ? (
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

              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={() => (
                  <FormItem>
                    <FormLabel>Start Date *</FormLabel>
                    <FormControl>
                      <div className="relative flex gap-2">
                        <Input
                          id="startDate"
                          value={formatDateForInput(startDate)}
                          placeholder="dd-mm-yyyy"
                          readOnly
                          className={clsx(
                            "w-full",
                            form.formState.errors.startDate &&
                              "border-destructive focus:ring-destructive",
                          )}
                        />
                        <Popover
                          open={openStartDate}
                          onOpenChange={setOpenStartDate}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            >
                              <CalendarIcon className="size-3.5" />
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
                              selected={startDate}
                              captionLayout="dropdown"
                              month={startMonth}
                              onMonthChange={setStartMonth}
                              onSelect={(selectedDate) => {
                                if (!selectedDate) return;
                                setStartDate(selectedDate);
                                form.setValue(
                                  "startDate",
                                  formatDateForValue(selectedDate),
                                );
                                setOpenStartDate(false);
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

              {/* End Date */}
              <FormField
                control={form.control}
                name="endDate"
                render={() => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <div className="relative flex gap-2">
                        <Input
                          id="endDate"
                          value={formatDateForInput(endDate)}
                          placeholder="dd-mm-yyyy"
                          readOnly
                          className={clsx(
                            "w-full",
                            form.formState.errors.endDate &&
                              "border-destructive focus:ring-destructive",
                          )}
                        />
                        <Popover
                          open={openEndDate}
                          onOpenChange={setOpenEndDate}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            >
                              <CalendarIcon className="size-3.5" />
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
                              selected={endDate}
                              captionLayout="dropdown"
                              month={endMonth}
                              onMonthChange={setEndMonth}
                              onSelect={(selectedDate) => {
                                if (!selectedDate) return;
                                setEndDate(selectedDate);
                                form.setValue(
                                  "endDate",
                                  formatDateForValue(selectedDate),
                                );
                                setOpenEndDate(false);
                              }}
                              disabled={(date) =>
                                startDate ? date < startDate : false
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Repeat Days */}
              <FormField
                control={form.control}
                name="repeatDays"
                render={({ field }) => {
                  const disableRepeat =
                    !endDate ||
                    (startDate &&
                      endDate &&
                      dayjs(startDate).isSame(endDate, "day"));

                  return (
                    <FormItem>
                      <FormLabel>Repeat Days</FormLabel>
                      <div className="flex justify-between gap-1">
                        {[
                          { label: "Su", value: 0 },
                          { label: "Mo", value: 1 },
                          { label: "Tu", value: 2 },
                          { label: "We", value: 3 },
                          { label: "Th", value: 4 },
                          { label: "Fr", value: 5 },
                          { label: "Sa", value: 6 },
                        ].map((day) => (
                          <Button
                            key={day.value}
                            type="button"
                            disabled={disableRepeat}
                            variant={
                              field.value?.includes(day.value)
                                ? "default"
                                : "outline"
                            }
                            onClick={() => {
                              const newValue = field.value?.includes(day.value)
                                ? field.value.filter(
                                    (v: number) => v !== day.value,
                                  )
                                : [...(field.value || []), day.value];
                              field.onChange(newValue);
                            }}
                            className="w-9"
                          >
                            {day.label}
                          </Button>
                        ))}
                      </div>
                      {disableRepeat && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Repeat days are disabled because end date is empty or
                          equals start date.
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            {/* Footer */}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-primary"
                disabled={
                  !form.formState.isDirty ||
                  form.formState.isSubmitting ||
                  isPending
                }
              >
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
