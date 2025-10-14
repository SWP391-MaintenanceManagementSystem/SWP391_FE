import { z } from "zod";

export const PartItemSchema = z.object({
  name: z
    .string()
    .nonempty("Item name is required")
    .min(2, "Item name must be between 2 and 50 characters long")
    .max(50, "Item name must be between 2 and 50 characters long"),
  categoryId: z.string().nonempty("Category is required"),

  stock: z
    .number()
    .refine((val) => Number.isInteger(val), {
      message: "Current Quantity must be an integer",
    })
    .refine((val) => val >= 1, {
      message: "Current Quantity cannot be negative",
    }),

  minStock: z
    .number()
    .refine((val) => Number.isInteger(val), {
      message: "Minimum Stock must be an integer",
    })
    .refine((val) => val >= 1, {
      message: "Minimum Stock cannot be negative",
    }),

  price: z.number().refine((val) => val >= 1, {
    message: "Unit Price cannot be negative",
  }),

  description: z
    .string()
    .max(300, "Description must be at most 300 characters")
    .optional(),
});

export type PartItemFormData = z.infer<typeof PartItemSchema>;

export const PartItemFormDefaultValues: PartItemFormData = {
  name: "",
  categoryId: "",
  stock: 0,
  minStock: 0,
  price: 0,
  description: "",
};
