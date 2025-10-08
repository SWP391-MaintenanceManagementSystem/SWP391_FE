import {
  ChangeProfileSchema,
  type ChangeProfileFormData,
} from "@/pages/profile/components/profile/libs/schema";
import { useUpdateProfileMutation } from "../mutations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountRole } from "@/types/enums/role";
import type { AccountWithProfile, Customer } from "@/types/models/account";

export default function useChangeProfile(user: AccountWithProfile | undefined) {
  const mutation = useUpdateProfileMutation();
  const form = useForm<ChangeProfileFormData>({
    resolver: zodResolver(ChangeProfileSchema),
    defaultValues: {
      firstName: user?.profile?.firstName || "",
      lastName: user?.profile?.lastName || "",
      email: user?.email || undefined,
      phone: user?.phone || "",
      address:
        user?.role === AccountRole.CUSTOMER
          ? (user?.profile as Customer)?.address || ""
          : undefined,
    },
  });

  const handleSubmit = async (data: ChangeProfileFormData) => {
    mutation.mutate(data);
  };

  return { handleSubmit, form };
}
