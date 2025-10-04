export const queryKeys = {
  // customers (list, search, sort, filter)
  customers: (params: {
    page: number;
    pageSize: number;
    firstName?: string;
    lastName?: string;
    status?: string;
    email?: string;
    phone?: string;
    sortBy?: string;
    orderBy?: "asc" | "desc";
  }) => ["customers", params] as const,

  // Customer theo ID
  customerById: (customerId: string) => ["customerById", customerId] as const,

  // Vehicles theo customer
  vehiclesList: (customerId: string) => ["vehicles", customerId] as const,

  // Vehicle theo ID
  vehicleById: (vehicleId: string) => ["vehicleById", vehicleId] as const,

  // Vehicle Brand
  vehicleBrand: () => ["vehicleBrand"] as const,

  // Vehicle Model
  vehicleModel: (brandId: number | string) =>
    ["vehicleModel", brandId] as const,

  // staffs (list, search, sort, filter)
  staffs: (params: {
    page: number;
    pageSize: number;
    firstName?: string;
    lastName?: string;
    status?: string;
    email?: string;
    phone?: string;
    sortBy?: string;
    orderBy?: "asc" | "desc";
  }) => ["staffs", params] as const,

  // technicians (list, search, sort, filter)
  technicians: (params: {
    page: number;
    pageSize: number;
    firstName?: string;
    lastName?: string;
    status?: string;
    email?: string;
    phone?: string;
    sortBy?: string;
    orderBy?: "asc" | "desc";
  }) => ["technicians", params] as const,

  // technicians by ID
  techniciansById: (id: string) => ["techniciansById", id] as const,
};
