import { httpPrivate } from "@/lib/http";
import type { BaseResponse } from "@/types/models/response";
import type { Vehicle } from "@/types/models/vehicle";


export const getMyVehicles = async () => {
    return await httpPrivate.get<BaseResponse<{ data: Vehicle[] }>>("/me/vehicles");
}