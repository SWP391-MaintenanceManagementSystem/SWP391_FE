import type { BookingAssignmentFormValues } from "@/pages/booking/lib/schema";
import { httpPrivate } from "@/lib/http";
import type { BaseResponse } from "@/types/models/response";
import type {
  BookingAssignment,
  BookingAssignmentDetails,
} from "@/types/models/booking-assignment";

export const createBookingAssignment = (data: BookingAssignmentFormValues) => {
  return httpPrivate.post<BaseResponse<BookingAssignment[]>>(
    `/booking-assignments`,
    data,
  );
};

export const unBookingAssignment = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/booking-assignments/${id}`);
};

export const getBookingAssignmentById = (id: string) => {
  return httpPrivate.get<BaseResponse<{ data: BookingAssignmentDetails[] }>>(
    `/booking-assignments/${id}`,
  );
};
