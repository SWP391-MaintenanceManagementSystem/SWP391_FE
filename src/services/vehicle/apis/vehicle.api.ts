import { httpPrivate } from "@/lib/http";
import type { AddVehicleFormData } from "@/pages/vehicle/components/libs/schema";
import type { BaseResponse } from "@/types/models/response";
import type {
  Vehicle,
  VehicleBrand,
  VehicleModel,
} from "@/types/models/vehicle";

export const getMyVehicles = async () => {
  return await httpPrivate.get<BaseResponse<{ data: Vehicle[] }>>(
    "/me/vehicles",
  );
};

export const getVehicleBrands = async () => {
  return await httpPrivate.get<BaseResponse<{ data: VehicleBrand[] }>>(
    "/vehicles/brands",
  );
};

export const getVehicleModelsByBrand = async (brand: number | string) => {
  return await httpPrivate.get<BaseResponse<{ data: VehicleModel[] }>>(
    `/vehicles/brands/${brand}/models`,
  );
};

export const addVehicle = async (formData: AddVehicleFormData) => {
  const formattedData = {
    ...formData,
    brandId: Number(formData.brandId),
    modelId: Number(formData.modelId),
  };
  const { brandId, ...rest } = formattedData;
  return await httpPrivate.post<BaseResponse<{ data: Vehicle }>>(
    "/vehicles",
    rest,
  );
};

export const deleteVehicle = async (vehicleId: string) => {
  return await httpPrivate.del<BaseResponse<{ data: Vehicle }>>(
    `/vehicles/${vehicleId}`,
  );
};
