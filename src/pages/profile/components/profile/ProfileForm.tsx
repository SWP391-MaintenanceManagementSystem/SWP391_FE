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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
                  <FormLabel>{t("profile.labels.first_name")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("profile.placeholders.first_name")} />
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
                  <FormLabel>{t("profile.labels.last_name")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("profile.placeholders.last_name")} />
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
                  <FormLabel>{t("profile.labels.email")}</FormLabel>
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
                  <FormLabel>{t("profile.labels.phone")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("profile.placeholders.phone")} />
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
                  <FormLabel>{t("profile.labels.address")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("profile.placeholders.address")} />
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
              {t("profile.actions.save_changes")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
