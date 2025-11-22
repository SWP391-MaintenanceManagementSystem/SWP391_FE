import type { ServiceCenter } from "./center";
import type { AccountWithProfile } from "./account";
const ShiftStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type ShiftStatus = (typeof ShiftStatus)[keyof typeof ShiftStatus];

export type Shift = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  maximumSlot: number;
  status: ShiftStatus;
  createdAt: string;
  updatedAt: string;
  serviceCenter: ServiceCenter;
};

export type WorkSchedule = {
  id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  account: AccountWithProfile;
  shift: Shift;
};
