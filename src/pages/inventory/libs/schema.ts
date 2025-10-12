import { z } from "zod";

export const PartItemSchema = z.object({
  name: z
    .string()
    .min(2, "Item name must be between 2 and 50 characters long")
    .max(50, "Item name must be between 2 and 50 characters long")
    .nonempty("Item name is required"),

  categoryId: z.string().nonempty("Category is required"),

  stock: z
    .number()
    .refine((val) => Number.isInteger(val), {
      message: "Current Quantity must be an integer",
    })
    .refine((val) => val >= 0, {
      message: "Current Quantity cannot be negative",
    }),

  minStock: z
    .number()
    .refine((val) => Number.isInteger(val), {
      message: "Minimum Stock must be an integer",
    })
    .refine((val) => val >= 0, {
      message: "Minimum Stock cannot be negative",
    }),

  price: z.number().refine((val) => val >= 0, {
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

export const CategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters long")
    .max(50, "Category name must be at most 50 characters long")
    .nonempty("Category name is required"),
});

export type CategoryFormData = z.infer<typeof CategorySchema>;

export const CategoryFormDefaultValues: CategoryFormData = {
  name: "",
};
