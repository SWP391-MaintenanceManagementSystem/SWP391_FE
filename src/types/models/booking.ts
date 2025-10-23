import type { BookingStatus } from "../enums/bookingStatus";

export type Booking = {
  id: string;
  customerId: string;
  vehicleId: string;
  centerId: string;
  shiftId: string;
  totalCost: number;
  bookingDate: Date;
  status: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BookingFilters = {
  search?: string;
  centerId?: string;
  status?: BookingStatus | "";
  isPremium?: boolean;
  fromDate?: Date | string;
  toDate?: Date | string;
  bookingDate?: Date | string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  orderBy?: "asc" | "desc";
};

export const defaultBookingFilter: BookingFilters = {
  page: 1,
  pageSize: 10,
};
