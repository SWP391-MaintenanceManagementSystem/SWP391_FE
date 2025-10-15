import z from "zod";
export const MembershipSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().min(1, "Price must be at least 1"),
    duration: z.number().min(1, "Duration must be at least 1"),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    description: z.string().max(500).optional(),
});
export type MembershipFormData = z.infer<typeof MembershipSchema>;
export const defaultMembershipValues: MembershipFormData = {
    name: "",
    price: 0,
    duration: 1,
    status: "ACTIVE",
    description: "",
};