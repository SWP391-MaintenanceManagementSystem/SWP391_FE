import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMembership,
  deleteMembership,
  updateMembership,
} from "../apis/membership.api";
import type { Membership } from "@/types/models/membership";
import { queryKeys } from "../queries/keys";
import { toast } from "sonner";

export const useAddMembershipMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Membership, "id">) => {
      const { name, periodType, duration, description, price } = data;
      const response = await addMembership({
        name,
        periodType,
        duration,
        description,
        price,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.memberships });
      toast.success("Membership added successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to add membership");
    },
  });
};

export const useDeleteMembershipMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (membershipId: string) => {
      const response = await deleteMembership(membershipId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.memberships });
      toast.success("Membership deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete membership");
    },
  });
};

export const useUpdateMembershipMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      membershipId,
      formData,
    }: {
      membershipId: string;
      formData: Partial<Membership>;
    }) => {
      const { name, periodType, duration, status, description, price } =
        formData;
      const response = await updateMembership(membershipId, {
        name,
        periodType,
        duration: Number(duration),
        status,
        description,
        price: Number(price),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.memberships });
      toast.success("Membership updated successfully");
    },

    onError: (err: any) => {
      toast.error(err.message || "Failed to update membership");
    },
  });
};
