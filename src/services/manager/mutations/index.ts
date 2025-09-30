import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomerInfo, deleteCustomer } from "../apis/cusomter.api";
import { toast } from "sonner";
import { queryKeys } from "../queries/keys";

export const useUpdateCustomerInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      id,
      currentPage,
      currentPageSize,
    }: {
      data: ChangeProfileFormData;
      id: string;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const { email, ...rest } = data;
      const updatedCustomerInfo = await updateCustomerInfo(id, rest);
      return updatedCustomerInfo.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers(
          variables.currentPage,
          variables.currentPageSize,
        ),
      });
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      currentPage,
      currentPageSize,
    }: {
      id: string;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const deletedCustomer = await deleteCustomer(id);
      return deletedCustomer.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers(
          variables.currentPage,
          variables.currentPageSize,
        ),
      });
      toast.success("Customer deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete customer");
    },
  });
};
