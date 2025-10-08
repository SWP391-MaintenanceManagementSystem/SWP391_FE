export const AccountRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  STAFF: "STAFF",
  TECHNICIAN: "TECHNICIAN",
} as const;

export type AccountRole = (typeof AccountRole)[keyof typeof AccountRole];