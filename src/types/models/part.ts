const PartStatus = {
  AVAILABLE: "AVAILABLE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  DISCONTINUED: "DISCONTINUED",
} as const;

export type PartStatus = (typeof PartStatus)[keyof typeof PartStatus];

export type Part = {
  id: string;
  name: string;
  quantity: number;
  minStock: number;
  status: PartStatus;
  category: Category;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export interface PartStat {
  totalItems: number;
  totalValue: number;
  totalQuantity: number;
  lowStockItems: number;
  categories: number;
}

// ===== Technician type =====
export interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// ===== Request refill response type =====
export interface RefillRequestResponse {
  part: Part;
  adminIds: string[];
  technician: Technician;
  refillAmount: number;
}