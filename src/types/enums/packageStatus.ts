export const PackageStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type PackageStatus = (typeof PackageStatus)[keyof typeof PackageStatus];
