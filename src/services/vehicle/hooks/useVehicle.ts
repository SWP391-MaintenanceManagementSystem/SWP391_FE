import { useRef } from "react";
import { useGetMyVehicle } from "../queries";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAddVehicleMutation } from "../mutations";
import { AddVehicleSchema, type AddVehicleFormData } from "@/pages/vehicle/components/libs/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";




export default function useVehicle() {
    const { data, isLoading, isError } = useGetMyVehicle();
    const addVehicleMutation = useAddVehicleMutation();

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

    return { data, isLoading, isError, onSubmit, form };
}
