import type { Booking } from "./booking";

export type BookingAssignment = {
  id: string;
  bookingId: string;
  employeeId: string;
  assignedBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BookingAssignmentDetails = {
  id: string;
  booking: Booking;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  assignedBy: string;
};
