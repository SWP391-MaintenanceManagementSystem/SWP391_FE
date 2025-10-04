import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomerInfo, deleteCustomer } from "../apis/customer.api";
import { toast } from "sonner";
import { queryKeys } from "../queries/keys";
import { deleteVehicle, editVehicle } from "../apis/vehicle.api";
import type { AddVehicleFormData } from "@/pages/vehicle/components/libs/schema";

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
        queryKey: queryKeys.customers({
          page: variables.currentPage,
          pageSize: variables.currentPageSize,
        }),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.customerById(variables.id),
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
        queryKey: queryKeys.customers({
          page: variables.currentPage,
          pageSize: variables.currentPageSize,
        }),
      });
      toast.success("Customer deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete customer");
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      customerId,
    }: {
      id: string;
      customerId: string;
    }) => {
      const deletedVehicle = await deleteVehicle(id);
      return deletedVehicle.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vehiclesList(variables.customerId),
      });
      toast.success("Vehicle deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete vehicle");
    },
  });
};

export const useEditVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      vehicleId,
      customerId,
      data,
    }: {
      vehicleId: string;
      customerId: string;
      data: AddVehicleFormData;
    }) => {
      const updatedVehicle = await editVehicle(vehicleId, data);
      return updatedVehicle.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vehiclesList(variables.customerId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.vehicleById(variables.vehicleId),
      });
      toast.success("Vehicle information updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update vehicle information");
    },
  });
};
