import type { Row } from "@tanstack/react-table";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { useState } from "react";
import type { Shift } from "@/types/models/shift";
import ViewDetailShift from "../ViewDetailShift";
import { ViewDetailDialog } from "@/components/dialog/ViewDetailDialog";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { useShift } from "@/services/shift/hooks/useShift";

export interface ColActionsProps {
  row: Row<Shift>;
  currentPage: number;
  currentPageSize: number;
}

export default function ColActions({
  row,
  currentPage,
  currentPageSize,
}: ColActionsProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const shift = row.original;
  const { handleDeleteShift } = useShift(currentPage, currentPageSize, shift);

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
            console.log("Row data to edit:", shift);
            setOpenEditDialog(true);
          }}
        />
      </TooltipWrapper>

      <TooltipWrapper content="Delete">
        <ActionBtn
          icon={<Trash size={12} />}
          onClick={() => {
            console.log("Row data to delete:", shift);
            setOpenDeleteDialog(true);
          }}
        />
      </TooltipWrapper>

      <ViewDetailDialog
        open={openViewDialog}
        onOpenChange={(open) => setOpenViewDialog(open)}
        title="Shift Information"
        styleContent=" md:min-w-[500px]"
      >
        <ViewDetailShift item={shift} />
      </ViewDetailDialog>

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => setOpenDeleteDialog(open)}
        onConfirm={handleDeleteShift}
      />
    </div>
  );
}
