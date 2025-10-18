import type { ServiceStatus } from "../enums/serviceStatus";

export type Service = {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: ServiceStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
  parts: [];
  finalPrice: number;
};
