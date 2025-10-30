import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import AccountStatusTag from "@/components/tag/AccountStatusTag";
import type { AccountStatus } from "@/types/enums/accountStatus";
import { EditDialog } from "@/components/dialog/EditDialog";
import { useGetServiceCenterList } from "@/services/manager/queries";
import { DatePickerInput } from "@/components/dialog/DatePickerInput";
import { type EditEmployeeFormData } from "../libs/schema";

interface EmployeeInfoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: EditEmployeeFormData) => void;
  form: ReturnType<typeof useForm<EditEmployeeFormData>>;
  title: string;
  isPending: boolean;
}

export default function EmployeeInfoForm({
  open,
  onOpenChange,
  onConfirm,
  form,
  title,
  isPending,
}: EmployeeInfoFormProps) {
  const { data: centerListData } = useGetServiceCenterList();
  const centerList = centerListData ?? [];

  return (
    <EditDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      form={form}
      title={title}
      styleFormLayout="grid-rows-6 md:grid-cols-2 md:grid-rows-5 "
      styleLayoutFooter="md:col-start-2 md:row-start-5"
      isPending={isPending}
    >
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
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
            <FormLabel>Last Name</FormLabel>
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
        disabled
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-500">Email</FormLabel>
            <FormControl>
              <Input placeholder="email@example.com" {...field} />
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
                    <AccountStatusTag status={field.value as AccountStatus} />
                    <ChevronDown className="mr-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem
                    onSelect={() => {
                      field.onChange("VERIFIED");
                    }}
                  >
                    <AccountStatusTag status="VERIFIED" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      field.onChange("NOT_VERIFY");
                    }}
                  >
                    <AccountStatusTag status="NOT_VERIFY" />
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => field.onChange("DISABLED")}>
                    <AccountStatusTag status="DISABLED" />
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => field.onChange("BANNED")}>
                    <AccountStatusTag status="BANNED" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
                    <span>
                      {centerList.find((c) => c.id === field.value)?.name ??
                        "Select Center"}
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
                disabled={!form.watch("workCenter.centerId")}
                ariaInvalid={!!form.formState.errors.workCenter?.startDate}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="workCenter.endDate"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <DatePickerInput
                label="End Date"
                value={field.value ?? undefined}
                onChange={field.onChange}
                disabled={!form.watch("workCenter.centerId")}
                ariaInvalid={!!form.formState.errors.workCenter?.endDate}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </EditDialog>
  );
}
