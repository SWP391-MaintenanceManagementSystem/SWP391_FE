import type { PackageStatus } from "../enums/packageStatus";

export type Package = {
  id: string;
  name: string;
  price: number;
  description?: string;
  status: PackageStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
  discountRate: number;
  services: PackageService[];
};

export type PackageService = {
  id: string;
  name: string;
  price: number;
};
