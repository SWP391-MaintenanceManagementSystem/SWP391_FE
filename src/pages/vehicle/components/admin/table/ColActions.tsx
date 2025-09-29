import type { Row } from "@tanstack/react-table";
import type { CustomerTable } from "./columns";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { useState } from "react";
import { useEditCustomerInfo } from "@/services/manager/hooks/useEditCustomerInfo";
import CustomerInfoForm from "../CustomerInfoForm";

interface ColActionsProps {
  row: Row<CustomerTable>;
}

export default function ColActions({ row }: ColActionsProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { form, handleEditCustomerInfo } = useEditCustomerInfo(row);
  const handleDelete = ({ row }: { row: Row<CustomerTable> }) => {
    console.log("Delete");
    console.log(row.original);
  };

  return (
    <div className="flex gap-1">
      <ActionBtn
        icon={<Maximize2 size={12} />}
        onClick={() => console.log("View Detail")}
      />
      <ActionBtn
        icon={<Pencil size={12} />}
        onClick={() => {
          console.log("Row data to edit:", row.original);
          setOpenEditDialog(true);
        }}
      />
      <ActionBtn
        icon={<Trash size={12} />}
        onClick={() => setOpenDeleteDialog(true)}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={() => setOpenDeleteDialog(false)}
        onConfirm={() => handleDelete({ row })}
      />

      <CustomerInfoForm
        open={openEditDialog}
        onOpenChange={(open) => setOpenEditDialog(open)}
        onConfirm={handleEditCustomerInfo}
        form={form}
      />
    </div>
  );
}
