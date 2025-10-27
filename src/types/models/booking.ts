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
  vehicleId?: string;
  customerId?: string;
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

type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type VehicleInfo = {
  id: string;
  licensePlate: string;
  vin: string;
  model: string;
  brand: string;
  productionYear?: number;
};

type ServiceCenterInfo = {
  name: string;

  address: string;
};

type ShiftInfo = {
  id: string;

  name: string;

  startTime: Date;

  endTime: Date;
};

type AssignerInfo = {
  firstName: string;

  lastName: string;

  email: string;
};

export type TechnicianBooking = {
  id: string;
  bookingDate: Date;
  status: BookingStatus;
  totalCost: number;
  note?: string;
  customer: CustomerInfo;
  vehicle: VehicleInfo;
  serviceCenter: ServiceCenterInfo;
  shift: ShiftInfo;
  assigner: AssignerInfo;
  createdAt: Date;
  updatedAt: Date;
};
