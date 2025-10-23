import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { BookingAssignmentFormValues } from "../../lib/schema";
import MultiTechnicianSelector from "./MultiTechnicianSelector";
import { useTechnicianSearch } from "@/services/manager/hooks/useEmployeeSearch";
import type { Booking } from "@/types/models/booking";

interface AssignmentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: BookingAssignmentFormValues) => void;
  form: ReturnType<typeof useForm<BookingAssignmentFormValues>>;
  item: Booking;
}

export default function AssignmentDialog({
  open,
  onOpenChange,
  onConfirm,
  form,
  item,
}: AssignmentProps) {
  const [initialized, setInitialized] = useState(false);

  const { keyword, setKeyword, data, isLoading } = useTechnicianSearch({
    centerId: item.centerId,
  });

  useEffect(() => {
    if (open && !initialized) {
      form.setValue("bookingId", item.id);
      form.setValue("employeeIds", []);
      setKeyword("");
      setInitialized(true);
    }
    if (!open) {
      setInitialized(false);
    }
  }, [open, item.id, form, setKeyword, initialized]);

  const selectedIds = form.watch("employeeIds");

  const onSubmit = async (values: BookingAssignmentFormValues) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    onConfirm(values);
    form.reset();
    setKeyword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] min-h-[300px] font-inter"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Assign Booking</DialogTitle>
          <DialogDescription>
            Fill out the details to assign this booking to a technician.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={clsx(
              "grid grid-cols-1 gap-4 max-h-[460px] overflow-y-auto",
            )}
          >
            <MultiTechnicianSelector
              form={form}
              fieldName="employeeIds"
              label="Select Technicians"
              placeholder="Search email to find technician..."
              keyword={keyword}
              setKeyword={setKeyword}
              data={data}
              isLoading={isLoading}
            />

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-primary"
                disabled={
                  selectedIds.length === 0 || form.formState.isSubmitting
                }
              >
                Assign Technician
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
