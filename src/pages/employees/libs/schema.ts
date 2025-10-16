import { z } from "zod";

export const EditEmployeeSchema = z.object({
  firstName: z
    .string()
    .min(2, { error: "First name must be between 2 and 30 characters long" })
    .max(30, { error: "First name must be between 2 and 30 characters long" })
    .regex(
      /^[\p{L}\s'-]+$/u,
      "First name can only contain letters, spaces, hyphens and apostrophes",
    )
    .optional()
    .refine((val) => val !== "", "First name cannot be empty string"),

  lastName: z
    .string()
    .min(2, { error: "Last name must be between 2 and 30 characters long" })
    .max(30, { error: "Last name must be between 2 and 30 characters long" })
    .regex(/^[\p{L}\s'-]+$/u, {
      error:
        "Last name can only contain letters, spaces, hyphens and apostrophes",
    })
    .optional()
    .refine((val) => val !== "", "Last name cannot be empty string"),

  email: z
    .email("Invalid email address")
    .optional()
    .refine((val) => val !== "", "Email cannot be empty string"),

  phone: z
    .string()
    .min(10, { error: "Phone must be at least 10 digits" })
    .max(15, { error: "Phone must be at most 15 digits" })
    .regex(
      /^(?:\+84|0)(3|5|7|8|9)\d{8}$/,
      "Phone number must be a valid Vietnamese phone number",
    )
    .optional()
    .refine((val) => val !== "", "Phone cannot be empty string"),

  address: z
    .string()
    .min(5, { error: "Address must be at least 5 characters" })
    .max(200, { error: "Address must be at most 200 characters" })
    .optional()
    .refine((val) => val !== "", "Address cannot be empty string"),

  status: z.enum(["VERIFIED", "NOT_VERIFY", "BANNED", "DISABLED"]).optional(),

  workCenter: z.object({
    centerId: z.string().nonempty("Work center ID is required"),
    startDate: z.preprocess((val) => {
      if (!val) return undefined;
      const date = new Date(val as string);
      return isNaN(date.getTime()) ? undefined : date;
    }, z.date().optional()),
    endDate: z.preprocess((val) => {
      if (!val) return undefined;
      const date = new Date(val as string);
      return isNaN(date.getTime()) ? undefined : date;
    }, z.date().optional()),
  }),
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
