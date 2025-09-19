export const AccountRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  STAFF: "STAFF",
  TECHNICAN: "TECHNICAN",
} as const;

export type AccountRole = (typeof AccountRole)[keyof typeof AccountRole];