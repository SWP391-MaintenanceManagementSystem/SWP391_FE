import type { BookingStatus } from "../enums/bookingStatus";

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isPremium: boolean;
};

type VehicleInfo = {
  id: string;
  licensePlate: string;
  vin: string;
  model: string;
  brand: string;
  productionYear: number;
};

type ServiceCenter = {
  name: string;
  address: string;
};

type ShiftInfo = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
};

type StaffInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type TechnicianInfo = {
  firstName: string;
  lastName: string;
};

export type CustomerBookingDetail = {
  id: string;
  bookingDate: Date | string;
  status: BookingStatus;
  totalCost: number;
  note: string;
  customer: CustomerInfo;
  vehicle: VehicleInfo;
  serviceCenter: ServiceCenter;
  shift: ShiftInfo;
  staff: StaffInfo;
  technicians: TechnicianInfo[];
};
