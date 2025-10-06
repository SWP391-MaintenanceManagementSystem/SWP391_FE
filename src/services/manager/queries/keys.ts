export const queryKeys = {
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

  // Employees by ID
  employeeById: (params: {
    id: string;
    type: "CUSTOMER" | "STAFF" | "TECHNICIAN";
  }) => ["accountById", params] as const,

  // Status status
  statusStat: (type: "STAFF" | "TECHNICIAN" | "CUSTOMER") =>
    ["statusStat", type] as const,

  // Sccounts (list, search, sort, filter)
  accounts: (params: {
    page: number;
    pageSize: number;
    firstName?: string;
    lastName?: string;
    status?: string;
    email?: string;
    phone?: string;
    sortBy?: string;
    orderBy?: "asc" | "desc";
    type?: "CUSTOMER" | "STAFF" | "TECHNICIAN";
  }) => ["accountss", params] as const,
};
