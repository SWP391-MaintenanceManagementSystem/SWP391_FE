import type { AccountWithProfile } from "./account";

const ServiceCenterStatus = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
} as const;

export type ServiceCenterStatus =
  (typeof ServiceCenterStatus)[keyof typeof ServiceCenterStatus];

export type ServiceCenter = {
  id: string;
  name: string;
  address: string;
  status: ServiceCenterStatus;
  createdAt: string;
  updatedAt: string;
};

export type WorkCenter = {
  id: string;
  startDate: string;
  endDate: string;
  account: AccountWithProfile;
  serviceCenter?: ServiceCenter;
};
