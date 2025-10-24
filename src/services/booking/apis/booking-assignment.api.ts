import type { BookingAssignmentFormValues } from "@/pages/booking/lib/schema";
import { httpPrivate } from "@/lib/http";
import type { BaseResponse } from "@/types/models/response";
import type { BookingAssignment } from "@/types/models/booking-assignment";

export const createBookingAssignment = (data: BookingAssignmentFormValues) => {
  return httpPrivate.post<BaseResponse<BookingAssignment[]>>(
    `/booking-assignments`,
    data,
  );
};
