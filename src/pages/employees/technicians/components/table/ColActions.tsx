import type { Row } from "@tanstack/react-table";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { useState } from "react";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import { useEmployee } from "@/services/manager/hooks/useEmployee";

interface ColActionsProps {
  row: Row<EmployeeTable>;
  currentPage: number;
  currentPageSize: number;
}

export default function ColActions({
  row,
  currentPage,
  currentPageSize,
}: ColActionsProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // const [openEditDialog, setOpenEditDialog] = useState(false);
  //
  const { handleDeleteTechnician } = useEmployee(
    row.original,
    currentPage,
    currentPageSize,
  );

  return (
    <div className="flex gap-1">
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Maximize2 size={12} />}
          onClick={() => {
            console.log("Row data to view:", row.original);
          }}
        />
      </TooltipWrapper>
      <TooltipWrapper content="Edit">
        <ActionBtn
          icon={<Pencil size={12} />}
          onClick={() => {
            console.log("Row data to edit:", row.original);
          }}
        />
      </TooltipWrapper>

      <TooltipWrapper content="Delete">
        <ActionBtn
          icon={<Trash size={12} />}
          onClick={() => {
            console.log("Row data to delete:", row.original);
            setOpenDeleteDialog(true);
          }}
        />
      </TooltipWrapper>

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => setOpenDeleteDialog(open)}
        onConfirm={() => {
          handleDeleteTechnician(row.original.id);
          setOpenDeleteDialog(false);
        }}
      />
    </div>
  );
}
