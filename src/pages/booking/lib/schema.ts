import { z } from "zod";

export const bookingSchema = z
  .object({
    vehicleId: z.string().min(1, "Please select your vehicle"),
    centerId: z.string().min(1, "Please select a service center"),
    service: z.array(z.string()).optional(),
    package: z.array(z.string()).optional(),
    note: z.string().optional(),
    dateTime: z
      .date({
        error: "Please select date & time",
      })
      .refine(
        (date) => date.getTime() > Date.now(),
        "Date & time must be in the future"
      ),
  })
  .superRefine((data, ctx) => {
    const hasService = data.service && data.service.length > 0;
    const hasPackage = data.package && data.package.length > 0;

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

export type BookingFormValues = z.infer<typeof bookingSchema>;

