export const queryKeys = {
  overview: () => ["overview"] as const,
  revenueByRange: (range: string) => ["revenueByRange", range] as const,
  trendingPurchase: () => ["trendingPurchase"] as const,
  inventoryStatus: () => ["inventoryStatus"] as const,
  serviceCenterStat: () => ["serviceCenterStat"] as const,
  staffDashboard: () => ["staffDashboard"] as const,
  customerDashboard: () => ["customerDashboard"] as const,
  technicianDashboard: () => ["technicianDashboard"] as const,
  technicianCurrentBooking: () => ["technicianCurrentBooking"] as const,
};
