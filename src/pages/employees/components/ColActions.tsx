import type { Row } from "@tanstack/react-table";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { useState } from "react";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import { useEmployee } from "@/services/manager/hooks/useEmployee";
import { ViewDetailDialog } from "@/components/dialog/ViewDetailDialog";
import ViewDetailEmployeeInfo from "@/pages/employees/components/ViewDetail";
import { toast } from "sonner";
import EditEmployeeInfoForm from "./EditEmployeeInfoForm";

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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDetailDialog, setOpenViewDetailDialog] = useState(false);
  const { handleDeleteEmployee, form, handleUpdateEmployeeInfo } = useEmployee(
    row.original,
    row.original.role as "STAFF" | "TECHNICIAN",
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
            setOpenViewDetailDialog(true);
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
            if (row.original.status === "DISABLED") {
              toast.error("Cannot delete disabled technician");
              return;
            }
            setOpenDeleteDialog(true);
          }}
        />
      </TooltipWrapper>

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => setOpenDeleteDialog(open)}
        onConfirm={() => {
          if (row.original.role === "TECHNICIAN") {
            handleDeleteEmployee(row.original.id);
          } else if (row.original.role === "STAFF") {
            handleDeleteEmployee(row.original.id);
          }
          setOpenDeleteDialog(false);
        }}
        isDisabled={row.original.status === "DISABLED"}
      />
      <ViewDetailDialog
        open={openViewDetailDialog}
        onOpenChange={(open) => setOpenViewDetailDialog(open)}
        title="Technicians Information"
        children={<ViewDetailEmployeeInfo employee={row.original} />}
        styleContent="md:max-w-[560px]"
      />

      <EditEmployeeInfoForm
        open={openEditDialog}
        onOpenChange={(open) => {
          setOpenEditDialog(open);
          if (!open) {
            form.reset();
          }
        }}
        form={form}
        title={row.original.role === "STAFF" ? "Staff" : "Technician"}
        onConfirm={async (data) => {
          handleUpdateEmployeeInfo(row.original.id, data);
        }}
      />
    </div>
  );
}
