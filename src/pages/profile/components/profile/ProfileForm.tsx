import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AccountWithProfile } from "@/types/models/account";
import { AccountRole } from "@/types/enums/role";
import type { ChangeProfileFormData } from "./libs/schema";

type ProfileFormProps = {
  user: AccountWithProfile | undefined;
  form: ReturnType<typeof useForm<ChangeProfileFormData>>;
  onSubmit: (data: ChangeProfileFormData) => void;
};

export default function ProfileForm({
  user,
  form,
  onSubmit,
}: ProfileFormProps) {
  const isCustomer = user?.role === AccountRole.CUSTOMER;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="First Name" />
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
                    <Input {...field} placeholder="Last Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      value={user?.email || ""}
                      disabled
                      className="bg-gray-200 cursor-not-allowed"
                    />
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
                    <Input {...field} placeholder="Phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isCustomer && (
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="mt-4 flex justify-start lg:justify-end">
            <Button
              type="submit"
              className="!bg-purple-primary !text-white dark:!text-black cursor-pointer"
              disabled={!form.formState.isDirty}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
