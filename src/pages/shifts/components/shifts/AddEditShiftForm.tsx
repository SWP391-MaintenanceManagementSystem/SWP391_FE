import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import type { ShiftFormData } from "../../libs/schema";
import type { Shift } from "@/types/models/shift";
import type { ServiceCenter } from "@/types/models/center";
import VehicleStatusTag from "@/components/tag/VehicleStatusTag";

interface AddEditShiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: ShiftFormData) => void;
  item?: Shift | null;
  centerList: ServiceCenter[];
  form: ReturnType<typeof useForm<ShiftFormData>>;
}

export function AddEditShiftDialog({
  open,
  onOpenChange,
  onConfirm,
  item,
  centerList,
  form,
}: AddEditShiftDialogProps) {
  const { setValue, watch } = form;

  const onSubmit = async (values: ShiftFormData) => {
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
          <DialogTitle>{item ? "Edit Shift" : "Add New Shift"}</DialogTitle>
          <DialogDescription>
            {item
              ? "Update the shift details below."
              : "Enter the details for the new shift."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:grid-rows-5"
          >
            {/* Shift Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Shift Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Shift Name" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Start Time */}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time *</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      id="startTime"
                      step="1"
                      required
                      {...field}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* End Time */}
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time *</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      id="endTime"
                      step="1"
                      required
                      {...field}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Center Select */}
            <div className="space-y-2 w-full md:col-span-2">
              <Label>Center *</Label>
              <Select
                onValueChange={(value) => {
                  setValue("centerId", value, { shouldDirty: true });
                }}
                value={watch("centerId")}
                aria-invalid={!!form.formState.errors.centerId}
              >
                <SelectTrigger
                  className={`w-full border ${
                    form.formState.errors.centerId
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-primary"
                  }`}
                >
                  <SelectValue placeholder="Select center" />
                </SelectTrigger>
                <SelectContent>
                  {centerList.map((center) => (
                    <SelectItem key={center.id} value={center.id}>
                      {center.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.centerId && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.centerId.message}
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="maximumSlot"
              render={({ field }) => (
                <FormItem className={item ? "col-span-1" : "col-span-2"}>
                  <FormLabel>Maximum Slots *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      id="maximumSlot"
                      min="1"
                      required
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {item && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue
                            placeholder="Select status"
                            className="text-black"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">
                            <VehicleStatusTag status="ACTIVE" />
                          </SelectItem>
                          <SelectItem value="INACTIVE">
                            <VehicleStatusTag status="INACTIVE" />
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
