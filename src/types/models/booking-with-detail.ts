import type { BookingStatus } from "../enums/bookingStatus";
import type { BookingDetailStatus } from "../enums/bookingDetailStatus";
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

type ServiceInfo = {
  id: string;
  name: string;
  price: number;
  status: BookingDetailStatus;
};

type PackageInfo = {
  id: string;
  name: string;
  price: number;
  status: BookingDetailStatus;
};

type BookingDetails = {
  services: ServiceInfo[];
  packages: PackageInfo[];
};

export type CustomerBookingDetails = {
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
  bookingDetails: BookingDetails;
};
