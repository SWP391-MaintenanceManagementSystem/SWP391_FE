import type { AccountWithProfile } from "./account";
import type { Booking } from "./booking";

export type VehicleHandover = {
  id: string;
  bookingId: string;
  staffId: string;
  odometer: number;
  note: string;
  description: string[];
  date: string;
  createdAt: string;
  updatedAt: string;
  staff: AccountWithProfile;
  booking: Booking;
};
