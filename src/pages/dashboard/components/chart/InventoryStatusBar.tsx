import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { InventoryStatusData } from "@/types/models/dashboard";

export function InventoryBar({ data }: { data: InventoryStatusData }) {
  const inStockPercent = Math.round((data.inStock / data.totalItems) * 100);
  const lowStockPercent = Math.round((data.lowStock / data.totalItems) * 100);
  const discontinuedPercent = Math.max(
    0,
    100 - inStockPercent - lowStockPercent,
  );

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {/* Stacked Bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                style={{ width: `${inStockPercent}%` }}
                className="bg-green-600 cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                In Stock: {data.inStock} items ({inStockPercent}%)
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                style={{ width: `${lowStockPercent}%` }}
                className="bg-red-500 cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Low Stock: {data.lowStock} items ({lowStockPercent}%)
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                style={{ width: `${discontinuedPercent}%` }}
                className=" bg-stone-400 cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Discontinued: {data.disStock} items ({discontinuedPercent}%)
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-green-600" />
            In Stock
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5  bg-red-500 " />
            Low Stock
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5  bg-stone-400" />
            Discontinued
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
