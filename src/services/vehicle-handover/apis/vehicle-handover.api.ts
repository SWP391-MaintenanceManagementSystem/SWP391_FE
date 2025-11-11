import { axiosPrivate } from "@/lib/axios";
import type { BaseResponse } from "@/types/models/response";
import type { VehicleHandover } from "@/types/models/vehicle-handover";

export const getVehicleHandoverByBookingId = async (bookingId: string) => {
  const response = await axiosPrivate.get<
    BaseResponse<{ data: VehicleHandover }>
  >(`/vehicle-handovers/booking/${bookingId}`);
  return response.data;
};

export const createVehicleHandover = async (formData: FormData) => {
  const response = await axiosPrivate.post<
    BaseResponse<{ data: VehicleHandover }>
  >("/vehicle-handovers", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateVehicleHandover = async (id: string, formData: FormData) => {
  const response = await axiosPrivate.patch<
    BaseResponse<{ data: VehicleHandover }>
  >(`/vehicle-handovers/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
