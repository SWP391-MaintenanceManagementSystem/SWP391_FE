import type { BookingDetailStatus } from "../enums/bookingDetailStatus";
import type { BookingStatus } from "../enums/bookingStatus";
import type { ServiceCenter } from "./center";
import type { Shift } from "./shift";

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
export type BookingDetail = {
  id: string;
  bookingId: string;
  serviceId: string;
  packageId?: string | null;
  quantity: number;
  status: BookingDetailStatus;
  unitPrice: number;
  createdAt: Date;
  updatedAt: Date;
};
export type BookingTable = {
  id: string;
  customerId: string;
  vehicleId: string;
  centerId: string;
  shiftId: string;
  totalCost: number;
  bookingDate: Date;
  status: BookingStatus;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  vehicle: {
    id: string;
    licensePlate: string;
    vin: string;
    model: string;
    brand?: string;
    productionYear?: number;
  };
  serviceCenter: ServiceCenter;
  shift: Shift;
  bookingDetails: BookingDetail[];
};

export type BookingFilters = {
  search?: string;
  centerId?: string;
  status?: BookingStatus | "";
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
