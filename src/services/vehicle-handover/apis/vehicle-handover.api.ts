import { axiosPrivate } from "@/lib/axios";
import type { BookingCheckinsFormValues } from "@/pages/booking/lib/schema";
import type { BaseResponse } from "@/types/models/response";
import type { VehicleHandover } from "@/types/models/vehicle-handover";

export const getVehicleHandoverByBookingId = async (bookingId: string) => {
  const response = await axiosPrivate.get<
    BaseResponse<{ data: VehicleHandover }>
  >(`/vehicle-handovers/booking/${bookingId}`);
  return response.data;
};

export const createVehicleHandover = async (
  vehicleHandoverData: BookingCheckinsFormValues,
) => {
  const response = await axiosPrivate.post<
    BaseResponse<{ data: VehicleHandover }>
  >("/vehicle-handovers", vehicleHandoverData);
  return response.data;
};
