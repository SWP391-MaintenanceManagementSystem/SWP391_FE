import type { ServiceStatus } from "../enums/serviceStatus";

export type Service = {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: ServiceStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
  finalPrice: number;
  parts: ServicePart[];
};

export type ServicePart = {
  id: string;
  name: string;
  quantity: number;
};
