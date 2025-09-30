import { useGetMyVehicle } from "../queries";
import { useAddVehicleMutation, useDeleteVehicleMutation } from "../mutations";
import { AddVehicleSchema, type AddVehicleFormData } from "@/pages/vehicle/components/libs/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";




export default function useVehicle() {
    const { data, isLoading, isError } = useGetMyVehicle();
    const addVehicleMutation = useAddVehicleMutation();
    const deleteVehicleMutation = useDeleteVehicleMutation();

    const form = useForm<AddVehicleFormData>({
        resolver: zodResolver(AddVehicleSchema),
        defaultValues: {
            vin: "",
            licensePlate: "",
            brandId: "",
            modelId: "",
        },
    });


    const onSubmit = (formData: AddVehicleFormData) => {
        addVehicleMutation.mutate(formData);
    }


    const onDeleteVehicle = (vehicleId: string) => {
        deleteVehicleMutation.mutate(vehicleId);
    }

    return { data, isLoading, isError, onSubmit, form, onDeleteVehicle };
}
