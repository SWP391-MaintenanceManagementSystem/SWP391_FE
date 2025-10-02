import { type HeaderContext } from "@tanstack/react-table";
import { type CustomerTable } from "@/pages/vehicle/components/libs/table-types";
import { ArrowDownAZ, ArrowUpZA, ArrowDownUp } from "lucide-react";

interface SortHeaderProps<T> {
  info: HeaderContext<CustomerTable, T>;
  title: string;
}

export default function SortHeader<T>({ info, title }: SortHeaderProps<T>) {
  const currentSorted = info.column.getIsSorted();

  const handleSorted = () => {
    if (currentSorted === "asc") {
      info.column.toggleSorting(true);
    } else if (currentSorted === "desc") {
      info.column.clearSorting();
    } else {
      info.column.toggleSorting(false);
    }
  };

  return (
    <div
      onPointerDown={(e) => {
        e.preventDefault();
        handleSorted();
      }}
      className="w-full h-full flex justify-start items-center gap-2  "
    >
      {title}
      {currentSorted === "asc" ? (
        <ArrowDownAZ size={14} className="text-gray-500" />
      ) : currentSorted === "desc" ? (
        <ArrowUpZA size={14} className="text-gray-500" />
      ) : (
        <ArrowDownUp size={14} className="text-gray-500" />
      )}
    </div>
  );
}
