import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./columns";
import type { Part, Category } from "@/types/models/part";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useGetPartList, useGetCategoryList } from "@/services/manager/queries";
import { useState } from "react";

export default function IventoryTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({
    status: "",
    categoryName: "",
  });

  const { data: apiGetCategory } = useGetCategoryList();
  const categoryList: Category[] = Array.isArray(apiGetCategory)
    ? apiGetCategory
    : [];

  const { data, isLoading, isFetching } = useGetPartList({
    name: searchValue || undefined,
    status: filters.status || undefined,
    categoryName: filters.categoryName || undefined,
    sortBy: sorting[0]?.id ?? "createdAt",
    orderBy: sorting[0]?.desc ? "desc" : "asc",
    page,
    pageSize,
  });

  const rawList = data?.data ?? [];

  const hanldeFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const columns = getColumns(hanldeFilterChange, filters, categoryList);

  return (
    <>
      <Card className="h-full flex-1 md:min-h-[500px] min-h-[600px]">
        <CardContent className="font-inter flex flex-col gap-4 h-full">
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
          />
        </CardContent>
      </Card>
    </>
  );
}
