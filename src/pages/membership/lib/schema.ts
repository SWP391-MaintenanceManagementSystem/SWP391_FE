import { MembershipStatus } from "@/types/enums/membershipStatus";
import { PeriodType } from "@/types/enums/periodType";
import z from "zod";
export const MembershipSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be at least 1"),
  duration: z.number().min(1, "Duration must be at least 1"),
  status: z.enum(MembershipStatus),
  description: z.string().max(500).optional(),
});
export type MembershipFormData = z.infer<typeof MembershipSchema>;
export const defaultMembershipValues: MembershipFormData = {
  name: "",
  price: 1,
  duration: 1,
  status: "ACTIVE",
  description: "",
};

export const CreateMembershipSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be at least 1"),
  duration: z.number().min(1, "Duration must be at least 1"),
  periodType: z.enum(PeriodType),
  description: z.string().max(500).optional(),
});

export type CreateMembershipsFormData = z.infer<typeof CreateMembershipSchema>;

export const defaultCreateMembershipValues: CreateMembershipsFormData = {
  name: "",
  price: 1,
  duration: 1,
  periodType: PeriodType.MONTH,
  description: "",
};
