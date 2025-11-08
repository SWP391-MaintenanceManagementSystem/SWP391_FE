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

export type SpendingEntry = {
  key: string; 
  amount: number;
};

export type CustomerDashboardData = {
  bookingTotal: number;
  bookingStatusSummary: {
    status: "PENDING" | "IN_PROGRESS" | "FINISHED";
    count: number;
    percentage: number;
  }[];
  bookingsByCenter: {
    center: string;
    count: number;
    percentage: number;
  }[];
  totalSpending: {
    week: SpendingEntry[];
    month: SpendingEntry[];
    year: SpendingEntry[];
    total: number; 
    average: number; 
    peak: {
      key: string;
      amount: number;
    };
  };
};

export type TechnicianDashboardData = {
  totalBookings: number;      
  completed: number;          
  inProgress: number;     
  pending: number;            
};

export type TechnicianCurrentBooking = {
  id: string;
  bookingDate: string;
  status: string;
  totalCost: number;
  note: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isPremium: boolean;
  };
  vehicle: {
    id: string;
    licensePlate: string;
    vin: string;
    model: string;
    brand: string;
    productionYear: number;
  };
  serviceCenter: {
    id: string;
    name: string;
    address: string;
  };
  shift: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
  };
  staff: {
    firstName: string;
    lastName: string;
    email: string;
  };
  technicians: {
    email: string;
    firstName: string;
    lastName: string;
  }[];
  bookingDetails: {
    services: {
      id: string;
      name: string;
      price: number;
    }[];
    packages: {
      id: string;
      bookingDetailId: string;
      name: string;
      price: number;
      status: string;
      services: {
        id: string;
        name: string;
        price: number;
      }[];
    }[];
  };
  feedback: string | null;
  rating: number | null;
  createdAt: string;
  updatedAt: string;
};



