export const queryKeys = {
  overview: () => ["overview"] as const,
  revenueByRange: (range: string) => ["revenueByRange", range] as const,
  trendingPurchase: () => ["trendingPurchase"] as const,
  inventoryStatus: () => ["inventoryStatus"] as const,
  serviceCenterStat: () => ["serviceCenterStat"] as const,
  staffDashboard: () => ["staffDashboard"] as const,
};
