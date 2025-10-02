import { httpPrivate } from "@/lib/http";
import type { BaseResponse } from "@/types/models/response";
import type { Vehicle } from "@/types/models/vehicle";

export const getVehicleByCustomerId = (customerId: string) => {
  return httpPrivate.get<BaseResponse<{ data: Vehicle[] }>>(
    `/vehicles/accounts/${customerId}`,
  );
};

export const deleteVehicle = (vehicleId: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/vehicles/${vehicleId}`);
};
