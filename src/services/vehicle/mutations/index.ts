import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVehicle } from "../apis/vehicle.api";
import type { AddVehicleFormData } from "@/pages/vehicle/components/libs/schema";
import { queryKeys } from "../queries/keys";
import { toast } from "sonner";


export const useAddVehicleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: AddVehicleFormData) => {
            const updatedUser = await addVehicle(data);
            return updatedUser.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.myVehicles });
            toast.success("Vehicle added successfully");
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to add vehicle");
        },
    });
}