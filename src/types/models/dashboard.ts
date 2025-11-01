export type InventoryStatusData = {
  inStock: number;
  lowStock: number;
  discontinued: number;
  totalItems: number;
  totalValue: number;
  lowStockItems: LowStockItem[];
};

export type LowStockItem = {
  name: string;
  quantity: number;
  minRequired: number;
};

export type RevenueData = {
  date: string;
  totalRevenue: number;
};

export type ServiceData = {
  name: string;
  value: number;
};

export type AdminDashboardData = {
  summary: {
    totalRevenue: number;
    totalCustomers: number;
    totalEmployees: number;
    totalServiceCenters: number;
    revenueGrowthRate: number;
    customerGrowthRate: number;
    employeeGrowthRate: number;
  };

  revenueStats: {
    range: string;
    data: RevenueData[];
  };

  trendingPurchases: {
    mostPopularMembership: string;
    mostPopularService: string;
    mostPopularPackage: string;
    totalPackages: number;
    totalServices: number;
    totalMemberships: number;
    services: ServiceData[];
    packages: ServiceData[];
    memberships: ServiceData[];
  };

  inventoryStatus: InventoryStatusData;

  serviceCenters: {
    centerName: string;
    bookings: number;
    revenue: number;
  }[];
};
