import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "./table/columns";
import type { Part, PartStatus, Category } from "@/types/models/part";
import type { ColumnDef } from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
export default function ItemsListSection() {
  // DUMBMY DATA
  const fakeParts = (count = 20, categories: Category[]): Part[] => {
    return Array.from({ length: count }, () => {
      const category = faker.helpers.arrayElement(categories);
      const quantity = faker.number.int({ min: 0, max: 200 });
      const minStock = faker.number.int({ min: 10, max: 50 });
      const status: PartStatus = quantity <= minStock ? "INSTOCK" : "LOWSTOCK";

      return {
        id: faker.string.uuid(),
        partName: faker.commerce.productName(),
        categoryId: category.id,
        quantity,
        minStock,
        status,
        price: Number(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
        description: faker.commerce.productDescription(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      };
    });
  };

  const fakeCategories: Category[] = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    categoryName: faker.commerce.department(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }));

  // Generate data
  const partsRaw = fakeParts(20, fakeCategories);

  // Map categoryName vào để hiển thị (không thay đổi type Part)
  const parts = partsRaw.map((part) => ({
    ...part,
    categoryName:
      fakeCategories.find((c) => c.id === part.categoryId)?.categoryName ??
      "Unknown",
  }));

  return (
    <Card className="h-full flex-1">
      <CardContent className="font-inter flex flex-col gap-6 h-full">
        <h3 className="font-semibold text-gray-text-header h-fit">
          Inventory Items
        </h3>
        <DataTable<Part, unknown>
          data={parts}
          columns={columns as ColumnDef<Part, unknown>[]}
          isSearch={true}
          searchPlaceholder="Name, Category"
        />
      </CardContent>
    </Card>
  );
}
