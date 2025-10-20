export const Method = {
  CARD: "CARD",
  CASH: "CASH",
} as const;

export type Method = (typeof Method)[keyof typeof Method];