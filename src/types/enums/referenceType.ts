export const ReferenceType = {
  BOOKING: "BOOKING",
  MEMBERSHIP: "MEMBERSHIP",
} as const;

export type ReferenceType = (typeof ReferenceType)[keyof typeof ReferenceType];