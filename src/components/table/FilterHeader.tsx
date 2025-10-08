import type { Column } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

interface FilterHeaderProps<TData> {
  column: Column<TData, unknown>;
  title: string;
  onFilterChange?: (value: string) => void;
  selectedValue?: string;
}

export default function FilterHeader<TData>({
  column,
  title,
  onFilterChange,
  selectedValue,
}: FilterHeaderProps<TData>) {
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
        <DropdownMenuRadioGroup
          value={selectedValue}
          onValueChange={onFilterChange}
        >
          <DropdownMenuRadioItem key="all" value="">
            All
          </DropdownMenuRadioItem>
          {filterOptions?.map((option: string) => (
            <DropdownMenuRadioItem key={option} value={option}>
              {labelOptions?.[option] ?? option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
