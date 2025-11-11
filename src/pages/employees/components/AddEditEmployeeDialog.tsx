import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EditEmployeeFormData } from "../libs/schema";
import type { EmployeeTable } from "../libs/table-types";
import { useGetServiceCenterList } from "@/services/manager/queries";
import AccountStatusTag from "@/components/tag/AccountStatusTag";
import type { AccountStatus } from "@/types/enums/accountStatus";
import { ChevronDown } from "lucide-react";
import { DatePickerInput } from "@/components/dialog/DatePickerInput";
import { useEffect, useRef } from "react";

interface AddEditEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: EditEmployeeFormData) => void;
  item?: EmployeeTable | null;
  form: ReturnType<typeof useForm<EditEmployeeFormData>>;
  isPending: boolean;
}

export function AddEditEmployeeDialog({
  open,
  onOpenChange,
  onConfirm,
  item,
  form,
  isPending,
}: AddEditEmployeeDialogProps) {
  const { data: centerListData } = useGetServiceCenterList();
  const centerList = centerListData ?? [];

  const onSubmit = async (values: EditEmployeeFormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    onConfirm(values);
  };

  const originalCenterIdRef = useRef(item?.workCenter?.id);
  const originalStartDateRef = useRef<Date | undefined>(
    item?.workCenter?.startDate
      ? new Date(item.workCenter.startDate)
      : undefined,
  );
  useEffect(() => {
    originalCenterIdRef.current = item?.workCenter?.id;
    originalStartDateRef.current = item?.workCenter?.startDate
      ? new Date(item.workCenter.startDate)
      : undefined;
  }, [item]);

  const selectedCenterId = useWatch({
    control: form.control,
    name: "workCenter.centerId",
  });

  useEffect(() => {
    if (!selectedCenterId) return;

    if (selectedCenterId === originalCenterIdRef.current) {
      form.setValue("workCenter.startDate", originalStartDateRef.current, {
        shouldDirty: false,
      });
    } else {
      form.setValue("workCenter.startDate", new Date(), {
        shouldDirty: true,
      });
    }
  }, [selectedCenterId, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] md:min-w-[700px] font-inter"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {item ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
          <DialogDescription>
            {item
              ? "Update employee information details below."
              : "Enter the details for the new employee."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:grid md:grid-cols-2 gap-x-4 "
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={item ? "md:col-span-2" : ""}>
                  <FormControl>
                    {item ? (
                      <>
                        <FormLabel className="text-gray-500">Email</FormLabel>
                        <Input
                          placeholder="email@example.com"
                          {...field}
                          readOnly
                        />
                      </>
                    ) : (
                      <>
                        <FormLabel>Email *</FormLabel>
                        <Input
                          placeholder="email@example.com"
                          {...field}
                          required
                          aria-invalid={!!form.formState.errors.email}
                        />
                      </>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+84 912 345 678" {...field} />
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full !outline-none flex justify-between"
                          >
                            <AccountStatusTag
                              status={field.value as AccountStatus}
                            />
                            <ChevronDown className="mr-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                          <DropdownMenuItem
                            onSelect={() => field.onChange("VERIFIED")}
                          >
                            <AccountStatusTag status="VERIFIED" />
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("NOT_VERIFY")}
                          >
                            <AccountStatusTag status="NOT_VERIFY" />
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("DISABLED")}
                          >
                            <AccountStatusTag status="DISABLED" />
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("BANNED")}
                          >
                            <AccountStatusTag status="BANNED" />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="workCenter.centerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Center</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className={`w-full border ${
                          form.formState.errors.workCenter?.centerId
                            ? "border-destructive focus:ring-destructive"
                            : "border-input focus:ring-primary"
                        }`}
                      >
                        <Button
                          variant="outline"
                          className="w-full !outline-none flex justify-between"
                        >
                          <span className="truncate">
                            {centerList.find((c) => c.id === field.value)
                              ?.name ?? "Select Center"}
                          </span>
                          <ChevronDown className="mr-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end">
                        {centerList.map((center) => (
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

            <FormField
              control={form.control}
              name="workCenter.startDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePickerInput
                      label="Start Date"
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                      disabled
                      ariaInvalid={
                        !!form.formState.errors.workCenter?.startDate
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer Buttons */}
            <DialogFooter className="md:col-span-2">
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
                disabled={!form.formState.isDirty || isPending}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
