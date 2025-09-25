import type { AccountWithProfile } from "@/types/models/account";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string({ error: "Password is required" }).min(6).max(100),
});

export const ChangePasswordSchema = z
  .object({
    password: z
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

export type LoginFormData = z.infer<typeof LoginSchema>;

export const defaultLoginValues: LoginFormData = {
  email: "",
  password: "",
};

export type LoginResponse = {
  account: AccountWithProfile;
  accessToken: string;
};

export const RegisterSchema = z
  .object({
    email: z.email("Please provide a valid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be between 8 and 50 characters long")
      .max(50, "Password must be between 8 and 50 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),

    confirmPassword: z.string().nonempty("Password confirmation is required"),

    firstName: z
      .string()
      .nonempty("First name is required")
      .min(2, "First name must be between 2 and 30 characters long")
      .max(30, "First name must be between 2 and 30 characters long")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "First name can only contain letters, spaces, hyphens and apostrophes",
      ),

    lastName: z
      .string()
      .nonempty("Last name is required")
      .min(2, "Last name must be between 2 and 30 characters long")
      .max(30, "Last name must be between 2 and 30 characters long")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Last name can only contain letters, spaces, hyphens and apostrophes",
      ),
    phone: z.string().optional(),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const defaultRegisterValues: RegisterFormData = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
};

export type RegisterResponse = {
  account: AccountWithProfile;
};

export const ForgotPasswordSchema = z.object({
  email: z.email("Please provide a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
export const defaultForgotPasswordValues: ForgotPasswordFormData = {
  email: "",
};

export const ResetCodeSchema = z.object({
  code: z.string().nonempty("Reset code is required"),
});

export type ResetCodeFormData = z.infer<typeof ResetCodeSchema>;

export const defaultResetCodeValues: ResetCodeFormData = {
  code: "",
};

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("New password is required")
      .min(8, "New password must be between 8 and 50 characters long")
      .max(50, "New password must be between 8 and 50 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "New password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),

    confirmNewPassword: z
      .string()
      .nonempty("Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export const defaultResetPasswordValues: ResetPasswordFormData = {
  newPassword: "",
  confirmNewPassword: "",
};
