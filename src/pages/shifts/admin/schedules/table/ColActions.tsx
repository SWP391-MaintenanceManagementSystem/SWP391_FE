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
import { EditScheduleDialog } from "../EditScheduleDialog";
import type { EditWorkScheduleFormData } from "@/pages/shifts/libs/schema";
import { toast } from "sonner";
import dayjs from "dayjs";

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
  const {
    handleDeleteSchedule,
    handleEditSchedule,
    editForm,
    isEditingPending,
  } = useWorkSchedule(schedule);

  return (
    <div className="flex gap-1">
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Maximize2 size={12} />}
          onClick={() => setOpenViewDialog(true)}
        />
      </TooltipWrapper>

      <TooltipWrapper content="Edit">
        <TooltipWrapper content="Edit">
          <ActionBtn
            icon={<Pencil size={12} />}
            onClick={() => {
              if (dayjs(schedule.date).isBefore(new Date())) {
                toast.warning("Cannot EDIT past schedules");
                return;
              }
              setOpenEditDialog(true);
              console.log("Edit", schedule);
            }}
          />
        </TooltipWrapper>
      </TooltipWrapper>

      <TooltipWrapper content="Delete">
        <ActionBtn
          icon={<Trash size={12} />}
          onClick={() => {
            if (dayjs(schedule.date).isBefore(new Date())) {
              toast.warning("Cannot DELETE past schedules");
              return;
            }
            setOpenDeleteDialog(true);
          }}
        />
      </TooltipWrapper>

      {/* View */}
      <ViewDetailDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        title="Work Schedule Details"
        styleContent="md:min-w-[580px]"
      >
        <ViewDetailSchedule item={schedule} />
      </ViewDetailDialog>

      {/* Delete */}
      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={() => handleDeleteSchedule({ currentPage, currentPageSize })}
      />

      {/* Edit */}
      <EditScheduleDialog
        open={openEditDialog}
        onOpenChange={(open) => {
          setOpenEditDialog(open);
          if (!open) editForm.reset();
        }}
        shiftList={shiftList}
        form={editForm}
        onConfirm={(data: EditWorkScheduleFormData) => {
          handleEditSchedule({
            currentPage,
            currentPageSize,
            data,
          });
        }}
        item={schedule}
        isPending={isEditingPending}
      />
    </div>
  );
}
