import { z } from "zod";

export const CreateBookingSchema = z
  .object({
    vehicleId: z.string().min(1, "Please select your vehicle"),
    centerId: z.string().min(1, "Please select a service center"),
    serviceIds: z.array(z.string()).optional(),
    packageIds: z.array(z.string()).optional(),
    note: z.string().optional(),
    bookingDate: z
      .date({
        error: "Please select date & time",
      })
      .refine(
        (date) => date.getTime() > Date.now(),
        "Date & time must be in the future"
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
