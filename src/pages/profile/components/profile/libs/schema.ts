import { z } from "zod";

export const ChangeProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be between 2 and 30 characters long")
    .max(30, "First name must be between 2 and 30 characters long")
    .regex(/^[\p{L}\s'-]+$/u, "First name can only contain letters, spaces, hyphens and apostrophes")
    .optional()
    .refine((val) => val !== "", "First name cannot be empty string"),

  lastName: z
    .string()
    .min(2, "Last name must be between 2 and 30 characters long")
    .max(30, "Last name must be between 2 and 30 characters long")
    .regex(/^[\p{L}\s'-]+$/u, "Last name can only contain letters, spaces, hyphens and apostrophes")
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
    .regex(/^(?:\+84|0)(3|5|7|8|9)\d{8}$/, "Phone number must be a valid Vietnamese phone number")
    .optional()
    .refine((val) => val !== "", "Phone cannot be empty string"),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be at most 200 characters")
    .optional()
    .refine((val) => val !== "", "Address cannot be empty string"),

  status: z
    .enum(["VERIFIED", "NOT_VERIFY", "BANNED", "DISABLED"])
    .optional(),
});

export type ChangeProfileFormData = z.infer<typeof ChangeProfileSchema>;

export const ChangeProfileFormDataValues: ChangeProfileFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  status: undefined,
};

export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Password must be between 8 and 50 characters long")
      .max(50, "Password must be between 8 and 50 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    newPassword: z
      .string()
      .min(8, "Password must be between 8 and 50 characters long")
      .max(50, "Password must be between 8 and 50 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    confirmNewPassword: z
      .string()
      .nonempty("New Password confirmation is required")
      .min(8, "Password must be between 8 and 50 characters long")
      .max(50, "Password must be between 8 and 50 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New Password do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

export const ChangePasswordFormDataValues: ChangePasswordFormData = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
