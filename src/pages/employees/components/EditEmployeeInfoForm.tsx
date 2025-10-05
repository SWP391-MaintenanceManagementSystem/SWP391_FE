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
import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";
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

interface EmployeeInfoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: ChangeProfileFormData) => void;
  form: ReturnType<typeof useForm<ChangeProfileFormData>>;
  title: string;
}

export default function EmployeeInfoForm({
  open,
  onOpenChange,
  onConfirm,
  form,
  title,
}: EmployeeInfoFormProps) {
  return (
    <EditDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      form={form}
      title={title}
      styleFormLayout="grid-rows-6 md:grid-cols-2 md:grid-rows-3 "
      styleLayoutFooter="md:col-start-2"
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
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="+1 (555) 555-5555" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </EditDialog>
  );
}
