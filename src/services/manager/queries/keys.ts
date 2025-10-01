export const queryKeys = {
  customersList: (page: number, pageSize: number) =>
    ["customers", { page, pageSize }] as const,

  customerSearchByEmail: (email: string) => ["customerSearchByEmail", email],

  customerById: (customerId: string) => ["customerById", customerId],

  sortedCustomers: (params: {
    page: number;
    pageSize: number;
    sortBy: string;
    orderBy: string;
  }) => ["sortedCustomers", params] as const,

  vehiclesList: (customerId: string) => ["vehicles", customerId] as const,
};
