import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomerInfo } from "../apis/cusomter.api";
import { toast } from "sonner";
import { queryKeys } from "../queries/keys";

export const useUpdateCustomerInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: ChangeProfileFormData;
      id: string;
    }) => {
      const { email, ...rest } = data;
      const updatedCustomerInfo = await updateCustomerInfo(id, rest);
      return updatedCustomerInfo.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customer });
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
};
