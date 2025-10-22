import type { Row } from "@tanstack/react-table";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { useState } from "react";
import type { Shift, WorkSchedule } from "@/types/models/shift";
import { ViewDetailDialog } from "@/components/dialog/ViewDetailDialog";
import ViewDetailSchedule from "../ViewDetailSchedule";
import { useWorkSchedule } from "@/services/shift/hooks/useWorkSchedule";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { AddEditScheduleDialog } from "../AddEditScheduleDialog";
import type { WorkScheduleFormData } from "@/pages/shifts/libs/schema";

export interface ColActionsProps {
  row: Row<WorkSchedule>;
  currentPage: number;
  currentPageSize: number;
  shiftList: Shift[];
}

export default function ColActions({
  row,
  currentPage,
  currentPageSize,
  shiftList,
}: ColActionsProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const schedule = row.original;
  const { handleDeleteSchedule, handleEditSchedule, form } = useWorkSchedule(
    currentPage,
    currentPageSize,
    schedule,
  );

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
            console.log("Row data to edit:", schedule);
            setOpenEditDialog(true);
          }}
        />
      </TooltipWrapper>

      <TooltipWrapper content="Delete">
        <ActionBtn
          icon={<Trash size={12} />}
          onClick={() => {
            console.log("Row data to delete:", schedule);
            setOpenDeleteDialog(true);
          }}
        />
      </TooltipWrapper>

      <ViewDetailDialog
        open={openViewDialog}
        onOpenChange={(open) => setOpenViewDialog(open)}
        title="Work Schedule Details"
        styleContent="md:min-w-[580px]"
      >
        <ViewDetailSchedule item={schedule} />
      </ViewDetailDialog>

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => setOpenDeleteDialog(open)}
        onConfirm={handleDeleteSchedule}
      />

      <AddEditScheduleDialog
        open={openEditDialog}
        onOpenChange={(open) => {
          setOpenEditDialog(open);
          if (!open) {
            form.reset();
          }
        }}
        shiftList={shiftList}
        form={form}
        onConfirm={(data: WorkScheduleFormData) => {
          handleEditSchedule(data);
        }}
        item={schedule}
      />
    </div>
  );
}
