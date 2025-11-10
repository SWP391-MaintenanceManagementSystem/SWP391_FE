import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomerInfo, deleteCustomer } from "../apis/customer.api";
import { toast } from "sonner";
import { queryKeys } from "../queries/keys";
import { deleteVehicle, editVehicle } from "../apis/vehicle.api";
import type { AddVehicleFormData } from "@/pages/vehicle/components/libs/schema";
import { deleteStaff, updateStaff, addStaff } from "../apis/staff.api";
import {
  deleteTechnician,
  updateTechnician,
  addTechnicican,
} from "../apis/technician.api";
import {
  addPartItem,
  detletePartItem,
  updatePartItem,
} from "../apis/inventory.api";
import type { PartItemFormData } from "@/pages/inventory/libs/schema";
import { type EditEmployeeFormData } from "@/pages/employees/libs/schema";
import { queryKeys as queryShiftKeys } from "@/services/shift/queries/keys";

export const useUpdateCustomerInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      id,
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
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.accounts({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.customerById(variables.id),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.statusStat("CUSTOMER"),
        }),

        queryClient.invalidateQueries({
          queryKey: ["overview"],
        }),
      ]);
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
    }: {
      id: string;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const deletedCustomer = await deleteCustomer(id);
      return deletedCustomer.data;
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.accounts({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.statusStat("CUSTOMER"),
        }),
        queryClient.invalidateQueries({
          queryKey: ["overview"],
        }),
      ]);
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
    }: {
      id: string;
      customerId: string;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const deletedVehicle = await deleteVehicle(id);
      return deletedVehicle.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vehiclesList({
          customerId: variables.customerId,
          page: variables.currentPage,
          pageSize: variables.currentPageSize,
        }),
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
      data,
    }: {
      vehicleId: string;
      customerId: string;
      currentPage: number;
      currentPageSize: number;
      data: AddVehicleFormData;
    }) => {
      const updatedVehicle = await editVehicle(vehicleId, data);
      return updatedVehicle.data;
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.vehiclesList({
            customerId: variables.customerId,
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.vehicleById(variables.vehicleId),
        }),
      ]);
      toast.success("Vehicle information updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update vehicle information");
    },
  });
};

export const useDeletePartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: string;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const del = await detletePartItem(id);
      return del.data;
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.parts({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.partStat(),
        }),
        queryClient.invalidateQueries({
          queryKey: ["inventoryStatus"],
        }),
      ]);
      toast.success("Deleted part item successfully");
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      role,
    }: {
      id: string;
      role: "STAFF" | "TECHNICIAN";
      currentPage: number;
      currentPageSize: number;
    }) => {
      if (role === "STAFF") {
        const deletedStaff = await deleteStaff(id);
        return deletedStaff.data;
      } else if (role === "TECHNICIAN") {
        const deletedTechnician = await deleteTechnician(id);
        return deletedTechnician.data;
      }

      if (role !== "STAFF" && role !== "TECHNICIAN") {
        throw new Error("Invalid role. Only STAFF or TECHNICIAN allowed.");
      }
    },
    onSuccess: async (_data, variables) => {
      if (variables.role === "STAFF") {
        toast.success("Staff deleted successfully");
      } else if (variables.role === "TECHNICIAN") {
        toast.success("Technician deleted successfully");
      }
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.accounts({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.statusStat(variables.role),
        }),
        queryClient.invalidateQueries({
          queryKey: queryShiftKeys.employees,
        }),

        queryClient.invalidateQueries({
          queryKey: ["overview"],
        }),

        queryClient.invalidateQueries({
          queryKey: queryShiftKeys.workSchedulesList({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
      ]);
    },
  });
};

export const useUpdateEmployeeInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      role,
      data,
      id,
    }: {
      role: "STAFF" | "TECHNICIAN";
      data: EditEmployeeFormData;
      id: string;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const { email, ...rest } = data;

      if (role === "STAFF") {
        return (await updateStaff(id, rest)).data;
      } else if (role === "TECHNICIAN") {
        return (await updateTechnician(id, rest)).data;
      }
      if (role !== "STAFF" && role !== "TECHNICIAN") {
        throw new Error("Invalid role. Only STAFF or TECHNICIAN allowed.");
      }
    },

    onSuccess: async (_data, variables) => {
      if (variables.role === "STAFF") {
        toast.success("Staff updated successfully");
      } else if (variables.role === "TECHNICIAN") {
        toast.success(`Technician updated successfully`);
      }
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.accounts({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: queryShiftKeys.employees,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.statusStat(variables.role),
        }),

        queryClient.invalidateQueries({
          queryKey: ["overview"],
        }),

        queryClient.invalidateQueries({
          queryKey: queryShiftKeys.workSchedulesList({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
      ]);
    },
  });
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      role,
      data,
    }: {
      role: "STAFF" | "TECHNICIAN";
      data: EditEmployeeFormData;
      currentPage: number;
      currentPageSize: number;
    }) => {
      if (role === "TECHNICIAN") {
        return (await addTechnicican(data)).data;
      }
      if (role === "STAFF") {
        return (await addStaff(data)).data;
      }
      throw new Error("Invalid role. Only STAFF or TECHNICIAN allowed.");
    },

    onSuccess: async (_data, variables) => {
      if (variables.role === "STAFF") {
        toast.success("Staff created successfully");
      } else {
        toast.success("Technician created successfully");
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.accounts({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: queryShiftKeys.employees,
        }),

        queryClient.invalidateQueries({
          queryKey: ["overview"],
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.statusStat(variables.role),
        }),

        queryClient.invalidateQueries({
          queryKey: queryShiftKeys.workSchedulesList({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
      ]);
    },
  });
};

export const useAddPartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: PartItemFormData;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const add = await addPartItem(data);
      return add.data;
    },

    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.parts({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.partStat(),
        }),
        queryClient.invalidateQueries({
          queryKey: ["inventoryStatus"],
        }),
      ]);
      toast.success("Part item information created successfully");
    },
  });
};

export const useEditPartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      partId,
      data,
    }: {
      partId: string;
      currentPage: number;
      currentPageSize: number;
      data: PartItemFormData;
    }) => {
      const update = await updatePartItem(partId, data);
      return update.data;
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.parts({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.partStat(),
        }),
        queryClient.invalidateQueries({
          queryKey: ["inventoryStatus"],
        }),
      ]);
      toast.success("Part item information updated successfully");
    },
  });
};
