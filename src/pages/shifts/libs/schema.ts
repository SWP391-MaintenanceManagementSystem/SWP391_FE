import { z } from "zod";

export const ShiftSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Shift name must be between 2 and 30 characters long" })
    .max(30, { error: "Shift name must be between 2 and 30 characters long" })
    .optional()
    .refine((val) => val !== "", "Shift name cannot be empty string"),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  centerId: z.string().min(1, { error: "Center ID cannot be empty" }),
  startTime: z.string().min(1, { error: "Start time cannot be empty" }),
  endTime: z.string().min(1, { error: "End time cannot be empty" }),
  maximumSlot: z
    .number()
    .refine((val) => Number.isInteger(val), {
      message: "Maximum Slot must be an integer",
    })
    .refine((val) => val >= 1, {
      message: "Maximum Slot cannot be negative",
    }),
});

export type ShiftFormData = z.infer<typeof ShiftSchema>;

export const ShiftFormDataValues: ShiftFormData = {
  name: "",
  status: undefined,
  centerId: "",
  startTime: "",
  endTime: "",
  maximumSlot: 0,
};

export const WorkScheduleSchema = z.object({
  centerId: z.string().min(1, { message: "Center ID cannot be empty" }),
  shiftId: z.string().min(1, { message: "Shift cannot be empty" }),
  employeeId: z.string().min(1, { message: "Employee cannot be empty" }),
  date: z.string().min(1, { message: "Date cannot be empty" }),
  endDate: z.string().optional(),
  repeatDays: z
    .array(z.number().int().min(0).max(6))
    .optional()
    .refine(
      (val) => !val || val.length > 0,
      "Repeat days cannot be an empty array",
    ),
});

export type WorkScheduleFormData = z.infer<typeof WorkScheduleSchema>;

export const WorkScheduleFormDataValues: WorkScheduleFormData = {
  centerId: "",
  shiftId: "",
  employeeId: "",
  date: "",
  endDate: "",
  repeatDays: [],
};
