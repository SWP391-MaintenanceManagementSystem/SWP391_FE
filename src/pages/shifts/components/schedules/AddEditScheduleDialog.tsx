import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import type { WorkScheduleFormData } from "../../libs/schema";
import type { Shift, WorkSchedule } from "@/types/models/shift";
import EmployeeSelector from "./EmployeeSelector";
import { useGetEmployeesQuery } from "@/services/shift/queries";
import clsx from "clsx";
import { Calendar22 } from "@/components/calendar-22";
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
  const { setValue, watch } = form;

  const { data: employeesList } = useGetEmployeesQuery();

  const selectedEmployeeId = watch("employeeId");

  const selectedEmployee = useMemo(
    () => employeesList?.find((e) => e.id === selectedEmployeeId),
    [employeesList, selectedEmployeeId],
  );

  const filteredShifts = useMemo(() => {
    const centerId = selectedEmployee?.workCenter?.id;
    if (!centerId) return [];
    return shiftList.filter((shift) => shift.serviceCenter?.id === centerId);
  }, [selectedEmployee, shiftList]);

  const onSubmit = async (values: WorkScheduleFormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    onConfirm(values);
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
            className={clsx("grid grid-cols-1 gap-4 md:grid-rows-4")}
          >
            {/* Employee Selector */}
            <div className="space-y-2 w-full col-span-2">
              <EmployeeSelector
                form={form}
                employees={
                  employeesList?.filter((emp) => emp.status === "VERIFIED") ||
                  []
                }
              />
            </div>

            {/* Shift Select */}
            <div className="space-y-2 w-full col-span-2">
              <Label>Shift *</Label>
              <Select
                onValueChange={(value) =>
                  setValue("shiftId", value, { shouldDirty: true })
                }
                value={watch("shiftId")}
                aria-invalid={!!form.formState.errors.shiftId}
                disabled={!selectedEmployee}
              >
                <SelectTrigger
                  className={`w-full border ${
                    form.formState.errors.shiftId
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-primary"
                  }`}
                >
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
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
              {form.formState.errors.shiftId && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.shiftId.message}
                </p>
              )}
            </div>

            <div className="space-y-2 w-full col-span-2">
              <Calendar22
                value={item?.date ? new Date(item.date) : undefined}
                onChange={(date) =>
                  form.setValue("date", date.toISOString().split("T")[0], {
                    shouldDirty: true,
                  })
                }
                title="Select Date *"
              />
              {form.formState.errors.date && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            {/* Footer Buttons */}
            <DialogFooter className="col-span-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="!outline-none bg-purple-primary"
                disabled={!form.formState.isValid}
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
