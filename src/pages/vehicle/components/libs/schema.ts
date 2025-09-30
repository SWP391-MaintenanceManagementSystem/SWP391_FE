import z from "zod";

export const AddVehicleSchema = z.object({
  vin: z
    .string()
    .regex(
      /^[A-HJ-NPR-Z0-9]{17}$/,
      "VIN must be exactly 17 characters (A-H, J-N, P, R-Z, 0-9), excluding I, O, Q"
    ),
  licensePlate: z
    .string()
    .regex(
      /^\d{2,3}[A-Z]-\d{4,5}$/,
      "License plate must follow the VN format (e.g., 51H-12345)"
    ),
  brandId: z.string().min(1, "Brand is required"),
  modelId: z.string().min(1, "Model is required"),
});

export type AddVehicleFormData = z.infer<typeof AddVehicleSchema>;

export const defaultAddVehicleValues: AddVehicleFormData = {
  vin: "",
  licensePlate: "",
  brandId: "",
  modelId: "",
};
