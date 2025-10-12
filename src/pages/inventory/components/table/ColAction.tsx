import type { Row } from "@tanstack/react-table";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import type { Part, Category } from "@/types/models/part";
import { useState } from "react";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { useInventory } from "@/services/manager/hooks/useInvetory";
import { ViewDetailDialog } from "@/components/dialog/ViewDetailDialog";
import ViewDetailPart from "../ViewDetailPart";
import { AddEditGoodsDialog } from "../AddEditGoodsDialog";

export interface ColActionsProps {
  row: Row<Part>;
  currentPage: number;
  currentPageSize: number;
  categoryList: Category[];
}

export default function ColActions({
  row,
  currentPage,
  currentPageSize,
  categoryList,
}: ColActionsProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const part = row.original;
  const { handleDeletePart, handleAddCategory, form, handleEditPartItem } =
    useInventory(currentPage, currentPageSize, part);

  return (
    <div className="flex gap-1">
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Maximize2 size={12} />}
          onClick={() => {
            console.log("View Details");
            setOpenViewDialog(true);
          }}
        />
      </TooltipWrapper>
      <TooltipWrapper content="Edit">
        <ActionBtn
          icon={<Pencil size={12} />}
          onClick={() => {
            console.log("Row data to edit:", part);
            setOpenEditDialog(true);
          }}
        />
      </TooltipWrapper>

      <TooltipWrapper content="Delete">
        <ActionBtn
          icon={<Trash size={12} />}
          onClick={() => {
            console.log("Row data to delete:", part);
            setOpenDeleteDialog(true);
          }}
        />
      </TooltipWrapper>

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => setOpenDeleteDialog(open)}
        onConfirm={() => {
          handleDeletePart(part.id);
        }}
      />

      <ViewDetailDialog
        open={openViewDialog}
        onOpenChange={(open) => setOpenViewDialog(open)}
        title="Part Item Information"
        styleContent="md:max-w-[580px]"
        children={<ViewDetailPart partItem={part} />}
      />

      <AddEditGoodsDialog
        open={openEditDialog}
        onOpenChange={(open) => {
          setOpenEditDialog(open);
          if (!open) {
            form.reset();
          }
        }}
        item={part}
        categories={categoryList}
        handleAddCategory={handleAddCategory}
        form={form}
        onConfirm={() => handleEditPartItem(part.id)}
      />
    </div>
  );
}
