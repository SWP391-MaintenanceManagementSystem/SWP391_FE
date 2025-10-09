const PartStatus = {
  INSTOCK: "INSTOCK",
  LOWSTOCK: "LOWSTOCK",
} as const;

export type PartStatus = (typeof PartStatus)[keyof typeof PartStatus];

export type Part = {
  id: string;
  partName: string;
  categoryId: string;
  quantity: number;
  minStock: number;
  status: PartStatus;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
};
