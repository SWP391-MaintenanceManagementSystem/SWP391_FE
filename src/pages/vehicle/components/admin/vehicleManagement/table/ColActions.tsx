import type { Row } from "@tanstack/react-table";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import type { Vehicle } from "@/types/models/vehicle";
import { useState } from "react";

interface ColActionsProps {
  row: Row<Vehicle>;
}

export default function ColActions({ row }: ColActionsProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  return (
    <div className="flex gap-1">
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Maximize2 size={12} />}
          onClick={() => {
            console.log("View Details");
          }}
        />
      </TooltipWrapper>
      <TooltipWrapper content="Edit">
        <ActionBtn
          icon={<Pencil size={12} />}
          onClick={() => {
            console.log("Row data to edit:", row.original);

            setOpenEditDialog(true);
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
    </div>
  );
}
