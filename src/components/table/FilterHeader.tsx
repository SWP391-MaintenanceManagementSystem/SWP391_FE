import type { Column } from "@tanstack/react-table";
import type { CustomerTable } from "../../pages/vehicle/components/admin/table/columns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

interface FilterHeaderProps {
  column: Column<CustomerTable, unknown>;
  title: string;
}

export default function FilterHeader({ column, title }: FilterHeaderProps) {
  const columnFilterValue = column.getFilterValue();
  const { filterOptions, labelOptions } = column.columnDef.meta ?? {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          {title}
          <Filter size={14} className="text-gray-500" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {filterOptions?.map((option: string) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={
              Array.isArray(columnFilterValue)
                ? columnFilterValue.includes(option)
                : columnFilterValue === option
            }
            onCheckedChange={(checked) => {
              let next: string[] = Array.isArray(columnFilterValue)
                ? [...columnFilterValue]
                : columnFilterValue
                  ? [String(columnFilterValue)]
                  : [];

              if (checked) next.push(option);
              else next = next.filter((v) => v !== option);

              column.setFilterValue(next.length ? next : undefined);
            }}
          >
            {labelOptions[option] ?? option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
