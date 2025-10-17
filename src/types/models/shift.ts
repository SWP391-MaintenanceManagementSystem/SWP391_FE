import type { ServiceCenter } from "./center";
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
