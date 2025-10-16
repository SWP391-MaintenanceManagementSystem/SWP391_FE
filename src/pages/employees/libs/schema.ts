import { z } from "zod";

export const EditEmployeeSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be between 2 and 30 characters long")
    .max(30, "First name must be between 2 and 30 characters long")
    .regex(
      /^[\p{L}\s'-]+$/u,
      "First name can only contain letters, spaces, hyphens and apostrophes",
    )
    .optional()
    .refine((val) => val !== "", "First name cannot be empty string"),

  lastName: z
    .string()
    .min(2, "Last name must be between 2 and 30 characters long")
    .max(30, "Last name must be between 2 and 30 characters long")
    .regex(
      /^[\p{L}\s'-]+$/u,
      "Last name can only contain letters, spaces, hyphens and apostrophes",
    )
    .optional()
    .refine((val) => val !== "", "Last name cannot be empty string"),

  email: z
    .email("Invalid email address")
    .optional()
    .refine((val) => val !== "", "Email cannot be empty string"),

  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
    .regex(
      /^(?:\+84|0)(3|5|7|8|9)\d{8}$/,
      "Phone number must be a valid Vietnamese phone number",
    )
    .optional()
    .refine((val) => val !== "", "Phone cannot be empty string"),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be at most 200 characters")
    .optional()
    .refine((val) => val !== "", "Address cannot be empty string"),

  status: z.enum(["VERIFIED", "NOT_VERIFY", "BANNED", "DISABLED"]).optional(),

  workCenter: z
    .object({
      centerId: z.string().optional().or(z.literal("")).optional(),
      startDate: z.preprocess(
        (val) => (val ? new Date(val as string) : undefined),
        z.date().optional(),
      ),
      endDate: z.preprocess(
        (val) => (val ? new Date(val as string) : undefined),
        z.date().optional(),
      ),
    })
    .optional()
    .refine(
      (val) => {
        if (val?.centerId && !val?.startDate) {
          return false;
        }
        return true;
      },
      { message: "Start date is required when center is selected" },
    )
    .refine(
      (val) => {
        if (!val?.startDate || !val?.endDate) return true;
        return val.startDate <= val.endDate;
      },
      { message: "End date must be after start date" },
    ),
});

export type EditEmployeeFormData = z.infer<typeof EditEmployeeSchema>;

export const EditEmployeeFormDataValues: EditEmployeeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  status: undefined,
  workCenter: {
    centerId: "",
    startDate: undefined,
    endDate: undefined,
  },
};
