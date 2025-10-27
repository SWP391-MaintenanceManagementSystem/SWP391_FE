export const ServiceStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus];
