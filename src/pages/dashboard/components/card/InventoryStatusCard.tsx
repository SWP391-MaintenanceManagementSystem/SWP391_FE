import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OctagonAlert, Package } from "lucide-react";
import { LowStockProgressBar } from "../chart/LowStockProgressBarList";
import { InventoryBar } from "../chart/InventoryStatusBar";
import { useGetInventoryStatus } from "@/services/dashboard/queries/admin";

export function InventoryStatusCard() {
  const { data, isLoading } = useGetInventoryStatus();

  if (isLoading) {
    return (
      <Card className="h-full w-full lg:min-w-[400px] gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Totals */}
          <div className="grid grid-cols-2 text-sm">
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          {/* Inventory bar placeholder */}
          <Skeleton className="h-32 w-full rounded-lg" />

          {/* Low stock list */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 font-medium text-md">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>

            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full lg:min-w-[400px] gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
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
            <p className="font-semibold text-xl pl-1">{data?.totalItems}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-lg font-medium">
              Total Value
            </p>
            <p className="font-semibold text-xl pl-1">
              ${data?.totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        <InventoryBar
          data={
            data ?? {
              inStock: 0,
              lowStock: 0,
              disStock: 0,
              totalItems: 1,
              totalValue: 0,
              lowStockItems: [],
            }
          }
        />

        {/* Low stock list */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 font-medium text-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-5 w-5 text-destructive" />
            </div>
            Low Stock Items
          </div>
          {(data?.lowStockItems?.length ?? 0) > 0 ? (
            <LowStockProgressBar data={data?.lowStockItems ?? []} />
          ) : (
            <p className="text-muted-foreground text-sm">No low stock items</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
