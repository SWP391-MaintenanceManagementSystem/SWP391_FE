export const MembershipStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE:"INACTIVE",
} as const;

export type MembershipStatus = (typeof MembershipStatus)[keyof typeof MembershipStatus];