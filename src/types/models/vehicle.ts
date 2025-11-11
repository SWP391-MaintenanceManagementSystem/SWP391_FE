const VehicleStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus];

export type Vehicle = {
  id: string;
  vin: string;
  model: string;
  brand: string;
  licensePlate: string;
  customerId: string;
  status: VehicleStatus;
  deletedAt: string | null;
  lastService: string | null;
  createdAt: string;
  updatedAt: string;
  productionYear: number;
};

export type VehicleBrand = {
  id: string;
  name: string;
};

export type VehicleModel = {
  id: string;
  name: string;
  brandId: string;
  productionYear: number;
  createdAt: string;
  updatedAt: string;
};
