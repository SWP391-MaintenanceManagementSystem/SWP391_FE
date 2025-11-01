import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OctagonAlert, Package } from "lucide-react";
import {
  LowStockProgressBar,
  type LowStockItem,
} from "../chart/LowStockProgressBarList";
import { InventoryBar } from "../chart/InventoryStatusBar";

export type InventoryStatusData = {
  instock: number;
  lowStock: number;
  outStock: number;
  totalItems: number;
  totalValue: number;
  lowStockItems: LowStockItem[];
};

interface InventoryStatusProps {
  data: InventoryStatusData;
}

export function InventoryStatusCard({ data }: InventoryStatusProps) {
  return (
    <Card className="h-full w-full lg:min-w-[400px] gap-3">
      <CardHeader>
        <CardTitle className=" flex items-center gap-2">
          <Package className="w-5 h-5" /> Inventory Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Totals */}
        <div className="grid grid-cols-2 text-sm">
          <div>
            <p className="text-muted-foreground text-lg font-medium">
              Total Items
            </p>
            <p className="font-semibold text-xl pl-1">{data.totalItems}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-lg font-medium">
              Total Value
            </p>
            <p className="font-semibold text-xl pl-1">
              ${data.totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        <InventoryBar data={data} />

        {/* Low stock list */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 font-medium text-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-5 w-5 text-destructive" />
            </div>
            Low Stock Items
          </div>
          <LowStockProgressBar data={data.lowStockItems} />
        </div>
      </CardContent>
    </Card>
  );
}
