import dayjs from "dayjs";
import { z } from "zod";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

export const CreateBookingSchema = z
  .object({
    vehicleId: z.string().min(1, "Please select your vehicle"),
    centerId: z.string().min(1, "Please select a service center"),
    serviceIds: z.array(z.string()).optional(),
    packageIds: z.array(z.string()).optional(),
    note: z.string().optional(),
    bookingDate: z
      .string({ error: "Booking date & time is required" })
      .refine((val) => dayjs(val, "YYYY-MM-DDTHH:mm", true).isValid(), {
        message: "Invalid date & time format",
      })
      .transform((val) => {
        const vnDate = dayjs(val).tz("Asia/Ho_Chi_Minh");
        return vnDate.format();
      })
      .refine(
        (dateStr) => {
          const date = dayjs(dateStr);
          return date.isAfter(dayjs());
        },
        {
          message: "Date & time must be in the future",
        }
      ),
  })
  .superRefine((data, ctx) => {
    const hasService = data.serviceIds && data.serviceIds.length > 0;
    const hasPackage = data.packageIds && data.packageIds.length > 0;

    if (!hasService && !hasPackage) {
      ctx.addIssue({
        code: "custom",
        message: "Please select at least one service OR package",
        path: ["service"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Please select at least one service OR package",
        path: ["package"],
      });
    }
  });

export type CreateBookingFormValues = z.infer<typeof CreateBookingSchema>;

export const BookingAssignmentSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  employeeIds: z
    .array(z.string().min(1, "Employee ID is required"))
    .min(1, "Please select at least one employee"),
});

export type BookingAssignmentFormValues = z.infer<
  typeof BookingAssignmentSchema
>;

export const EditBookingSchema = CreateBookingSchema.partial()
  .extend({
    id: z.string().min(1, "Booking ID is required"),
  })
  .superRefine((data, ctx) => {
    const hasService = data.serviceIds && data.serviceIds.length > 0;
    const hasPackage = data.packageIds && data.packageIds.length > 0;

    if ((data.serviceIds || data.packageIds) && !hasService && !hasPackage) {
      ctx.addIssue({
        code: "custom",
        message: "Please select at least one service OR package",
        path: ["service"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Please select at least one service OR package",
        path: ["package"],
      });
    }
  })
  .transform((data) => {
    if (data.bookingDate) {
      data.bookingDate = dayjs(data.bookingDate)
        .tz("Asia/Ho_Chi_Minh")
        .format();
    }
    return data;
  });

export type EditBookingFormValues = z.infer<typeof EditBookingSchema>;
