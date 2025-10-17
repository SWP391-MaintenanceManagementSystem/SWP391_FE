import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddDialog } from "@/components/dialog/AddDialog";
import { type EditEmployeeFormData } from "../libs/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/dialog/DatePickerInput";
import { useGetServiceCenterList } from "@/services/manager/queries";

interface AddEmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: EditEmployeeFormData) => void;
  form: ReturnType<typeof useForm<EditEmployeeFormData>>;
  title: string;
}

export default function AddEmployeeForm({
  open,
  onOpenChange,
  onConfirm,
  form,
  title,
}: AddEmployeeFormProps) {
  const { data: centerListData } = useGetServiceCenterList();
  const centerList = centerListData ?? [];

  return (
    <AddDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      form={form}
      title={title}
      styleFormLayout="grid-rows-6 grid-cols-1 md:grid-cols-2 md:grid-rows-5"
      styleLayoutFooter="md:col-start-2 md:row-start-5"
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
          <FormItem>
            <FormLabel>Email *</FormLabel>
            <FormControl>
              <Input
                placeholder="email@example.com"
                {...field}
                required
                aria-invalid={!!form.formState.errors.email}
              />
            </FormControl>
            <FormMessage>
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </FormMessage>
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
        name="workCenter.centerId"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Service Center *</FormLabel>
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
                label="Start Date *"
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
    </AddDialog>
  );
}
