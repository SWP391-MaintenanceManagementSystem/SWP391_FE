export type InventoryStatusData = {
  inStock: number;
  lowStock: number;
  disStock: number;
  totalItems: number;
  totalValue: number;
  lowStockItems: LowStockItems[];
};

export type LowStockItems = {
  name: string;
  quantity: number;
  minRequired: number;
};

export type RevenueData = {
  range: "1d" | "3d" | "1w" | "1m" | "3m";
  data: {
    date: string;
    totalRevenue: number;
  }[];
};

export type ServiceData = {
  name: string;
  value: number;
};

export type AdminOverview = {
  totalRevenue: number;
  totalCustomers: number;
  totalEmployees: number;
  totalServiceCenters: number;
  revenueGrowthRate: number;
  customerGrowthRate: number;
  employeeGrowthRate: number;
};

export type TrendingPurchase = {
  mostPopularMembership: string[];
  mostPopularService: string[];
  mostPopularPackage: string[];
  totalPackages: number;
  totalServices: number;
  totalMemberships: number;
  services: ServiceData[];
  packages: ServiceData[];
  memberships: ServiceData[];
};

export type ServiceCenterStat = {
  centerName: string;
  bookings: number;
  revenue: number;
};

export type StaffDashboardData = {
  totalCustomers: number;
  newTickets: number;
  bookingOverview: BookingOverview;
};

export type BookingOverview = {
  total: number;
  bookingStatistics: BookingStatistic[];
};

export type BookingStatistic = {
  name:
    | "Pending"
    | "Assigned"
    | "In Progress"
    | "Cancelled"
    | "Checked In"
    | "Checked Out"
    | "Completed";
  value: number;
};
