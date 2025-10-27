import { httpPrivate } from "@/lib/http";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { Vehicle, VehicleModel } from "@/types/models/vehicle";
import type { AddVehicleFormData } from "@/pages/vehicle/components/libs/schema";

export const getVehicleByCustomerId = (params: {
  customerId: string;
  page: number;
  pageSize: number;
  vin?: string;
  licensePlate?: string;
  status?: string;
  modelId?: number;
  brandId?: number;
  sortBy?: string;
  orderBy?: "asc" | "desc";
}) => {
  const { customerId, ...rest } = params;
  return httpPrivate.get<BaseResponse<PaginationResponse<Vehicle>>>(
    `/vehicles/accounts/${customerId}`,
    {
      params: rest,
    },
  );
};

export const deleteVehicle = (vehicleId: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/vehicles/${vehicleId}`);
};

export const getVehicleById = (vehicleId: string) => {
  return httpPrivate.get<BaseResponse<{ data: Vehicle }>>(
    `/vehicles/${vehicleId}`,
  );
};

export const editVehicle = (vehicleId: string, data: AddVehicleFormData) => {
  const { brandId, ...rest } = data;
  return httpPrivate.patch<BaseResponse<{ data: Vehicle }>>(
    `/vehicles/${vehicleId}`,
    {
      ...rest,
      modelId: Number(rest.modelId),
    },
  );
};

export const getVehicleModelsByBrandId = async (brandId: number | string) => {
  return await httpPrivate.get<BaseResponse<{ data: VehicleModel[] }>>(
    `/vehicles/brands/${brandId}/models`,
  );
};
