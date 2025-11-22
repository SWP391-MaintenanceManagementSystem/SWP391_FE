import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./table/columns";
import type { Part, Category } from "@/types/models/part";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useGetPartList, useGetCategoryList } from "@/services/manager/queries";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useInventory } from "@/services/manager/hooks/useInvetory";
import { AddEditGoodsDialog } from "./AddEditGoodsDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@uidotdev/usehooks";

export default function ItemsListSection() {
  const [openAddModal, setOpenAddModal] = useState(false);
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
  const debouncedSearch = useDebounce(searchValue, 300);
  const { data, isLoading, isFetching } = useGetPartList({
    name: debouncedSearch || undefined,
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

  const { handleAddPartItem, form, isPending } = useInventory(page, pageSize);

  return (
    <>
      <Card className="h-full flex-1 md:min-h-[500px] min-h-[600px]">
        <CardContent className="font-inter flex flex-col gap-4 h-full">
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-30 rounded-md" />
              <div className="flex flex-col gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>
            </>
          ) : (
            <>
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
                    onClick={() => setOpenAddModal(true)}
                    className=" w-full md:w-[150px] justify-self-end"
                    variant="outline"
                    autoFocus={false}
                  >
                    Add New Item
                    <Plus className="h-4 w-4" />
                  </Button>
                }
              />
            </>
          )}
        </CardContent>
      </Card>
      <AddEditGoodsDialog
        open={openAddModal}
        onOpenChange={(open) => {
          setOpenAddModal(open);
        }}
        onConfirm={async (data) => {
          const success = await handleAddPartItem(data);
          if (success) {
            setOpenAddModal(false);
            form.reset();
          }
        }}
        form={form}
        categories={categoryList}
        isPending={isPending}
      />
    </>
  );
}
