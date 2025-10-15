import { z } from "zod";

export const bookingSchema = z
  .object({
    vehicle: z.string().min(1, "Please select your vehicle"),
    center: z.string().min(1, "Please select a service center"),
    service: z.array(z.string()),
    package: z.array(z.string()),
    note: z.string().optional(),
    dateTime: z
      .date()
      .refine(
        (date) => date.getTime() > Date.now(),
        "Date & time must be in the future"
      ),
  })
  .superRefine((data, ctx) => {
    if (data.service.length === 0 && data.package.length === 0) {
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

export type BookingFormValues = z.infer<typeof bookingSchema>;
