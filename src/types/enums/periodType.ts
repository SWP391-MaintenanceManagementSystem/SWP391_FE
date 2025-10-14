export const PeriodType = {
  DAY: "DAY",
  MONTH: "MONTH",
  YEAR: "YEAR",
} as const;

export type PeriodType = (typeof PeriodType)[keyof typeof PeriodType];