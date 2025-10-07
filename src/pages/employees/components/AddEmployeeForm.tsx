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
import { AddDialog } from "@/components/dialog/AddDialog";

interface AddEmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: ChangeProfileFormData) => void;
  form: ReturnType<typeof useForm<ChangeProfileFormData>>;
  title: string;
}

export default function AddEmployeeForm({
  open,
  onOpenChange,
  onConfirm,
  form,
  title,
}: AddEmployeeFormProps) {
  return (
    <AddDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      form={form}
      title={title}
      styleFormLayout="grid-rows-6 md:grid-cols-2 md:grid-rows-3 "
      styleLayoutFooter="md:col-start-2 md:row-start-3"
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Email<span className="text-gray-400">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="email@example.com" {...field} required />
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
    </AddDialog>
  );
}
