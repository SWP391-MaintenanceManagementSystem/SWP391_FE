import type { AdminDashboardData } from "@/types/models/dashboard";
import { faker } from "@faker-js/faker";

const generateRevenueStats = (days: number) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0], // YYYY-MM-DD
      totalRevenue: faker.number.int({ min: 5000, max: 25000 }),
    });
  }

  return data;
};

export const fakeAdminDashboardData: AdminDashboardData = {
  summary: {
    totalRevenue: faker.number.int({ min: 500000, max: 2000000 }),
    totalCustomers: faker.number.int({ min: 1000, max: 5000 }),
    totalEmployees: faker.number.int({ min: 100, max: 300 }),
    totalServiceCenters: faker.number.int({ min: 5, max: 20 }),
    revenueGrowthRate: faker.number.int({ min: -50, max: 80 }),
    customerGrowthRate: faker.number.int({ min: -30, max: 70 }),
    employeeGrowthRate: faker.number.int({ min: -10, max: 30 }),
  },

  revenueStats: {
    range: "last_90_days",
    data: generateRevenueStats(90),
  },

  trendingPurchases: {
    mostPopularMembership: "Gold Plan",
    mostPopularService: "Oil Change",
    mostPopularPackage: "Basic Maintenance",
    totalMemberships: faker.number.int({ min: 100, max: 300 }),
    totalServices: faker.number.int({ min: 100, max: 300 }),
    totalPackages: faker.number.int({ min: 100, max: 300 }),
    services: [
      { name: "Engine Repair", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Tire Change", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Oil Change", value: 500 },
      {
        name: "Battery Service",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      { name: "AC Repair", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Brake Service", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Car Wash", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Detailing", value: faker.number.int({ min: 60, max: 200 }) },
      {
        name: "Wheel Alignment",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Transmission Repair",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Suspension Service",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Lighting Check",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Cooling System Flush",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Filter Replacement",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Exhaust System",
        value: faker.number.int({ min: 60, max: 200 }),
      },
    ],

    packages: [
      {
        name: "Basic Maintenance",
        value: 400,
      },
      { name: "Standard Care", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Premium Care", value: faker.number.int({ min: 60, max: 200 }) },
      {
        name: "Performance Upgrade",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Engine Tune-Up",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Interior Detailing",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Tire & Brake Service",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Battery Check & Replacement",
        value: faker.number.int({ min: 60, max: 200 }),
      },
      {
        name: "Seasonal Inspection",
        value: faker.number.int({ min: 60, max: 200 }),
      },
    ],

    memberships: [
      { name: "Silver Plan", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Gold Plan", value: 300 },
      { name: "Platinum Plan", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Elite Plan", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Platinum Plan", value: faker.number.int({ min: 60, max: 200 }) },
      { name: "Elite Plan", value: faker.number.int({ min: 60, max: 200 }) },
    ],
  },

  inventoryStatus: {
    inStock: 100,
    lowStock: 5,
    discontinued: 10,
    totalItems: 115,
    totalValue: faker.number.int({ min: 100000, max: 300000 }),
    lowStockItems: [
      { name: "Engine Oil", quantity: 8, minRequired: 30 },
      { name: "Brake Fluid", quantity: 4, minRequired: 20 },
      { name: "Air Filter", quantity: 15, minRequired: 40 },
      { name: "Spark Plug", quantity: 5, minRequired: 25 },
      { name: "Coolant", quantity: 2, minRequired: 15 },
    ],
  },

  serviceCenters: Array.from({ length: 6 }).map((_, i) => ({
    centerName: `Center ${String.fromCharCode(65 + i)}`,
    bookings: faker.number.int({ min: 20, max: 80 }),
    revenue: faker.number.int({ min: 500, max: 3000 }),
  })),
};
