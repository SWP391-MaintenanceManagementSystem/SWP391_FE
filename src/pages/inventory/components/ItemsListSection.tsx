import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./table/columns";
import type { Part } from "@/types/models/part";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useGetPartList } from "@/services/manager/queries";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function ItemsListSection() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    status: "",
    categoryName: "",
  });

  const { data, isLoading, isFetching } = useGetPartList({
    page,
    pageSize,
    name: searchValue || undefined,
    status: filters.status || undefined,
    categoryName: filters.categoryName || undefined,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
  });

  const rawList = data?.data ?? [];

  const hanldeFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const columns = getColumns(hanldeFilterChange, filters);

  // const partsList: Part[] = rawList.map((item) => {
  //   const category = item.category;
  //   return {
  //     id: item.id,
  //     name: item.description,
  //     description: item.description,
  //     status: item.status,

  //   };
  // });

  return (
    <Card className="h-full flex-1">
      <CardContent className="font-inter flex flex-col gap-6 h-full">
        <h3 className="font-semibold text-gray-text-header h-fit">
          Inventory Items
        </h3>
        <DataTable<Part, unknown>
          data={rawList}
          columns={columns as ColumnDef<Part, unknown>[]}
          pageIndex={(data?.page ?? 1) - 1}
          pageSize={data?.pageSize ?? 10}
          totalPage={data?.totalPages ?? 1}
          isLoading={isLoading}
          isFetching={isFetching}
          onPageChange={(newPage) => setPage(newPage + 1)}
          onPageSizeChange={setPageSize}
          manualPagination
          isSearch={true}
          searchPlaceholder="Name, Category"
          onSearchChange={setSearchValue}
          manualSearch
          sorting={sorting}
          onSortingChange={setSorting}
          manualSorting
          headerActions={
            <Button
              onClick={() => console.log("ADD")}
              className="flex items-center gap-2"
              variant="outline"
            >
              Add New Item
              <Plus className="h-4 w-4" />
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
