import type { Row } from "@tanstack/react-table";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { useState } from "react";
import useCustomer from "@/services/manager/hooks/useCustomer";
import CustomerInfoForm from "../CustomerInfoForm";
import { AccountStatus } from "@/types/enums/accountStatus";
import { toast } from "sonner";
import { encodeBase64 } from "@/utils/base64";
import { useNavigate } from "react-router-dom";
import type { CustomerTable } from "../../../libs/table-types";
import { TooltipWrapper } from "@/components/TooltipWrapper";

interface ColActionsProps {
  row: Row<CustomerTable>;
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
  const navigate = useNavigate();
  const customer = row.original;
  const { form, handleEditCustomerInfo, handleDeleteCustomer } = useCustomer(
    customer,
    currentPage,
    currentPageSize,
  );

  return (
    <div className="flex gap-1">
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Maximize2 size={12} />}
          onClick={() => {
            const encodedId = encodeBase64(row.original.id);
            navigate(`/vehicles/${encodedId}`, {
              state: { currentPage, currentPageSize },
            });
          }}
        />
      </TooltipWrapper>
      <TooltipWrapper content="Edit">
        <ActionBtn
          icon={<Pencil size={12} />}
          onClick={() => {
            console.log("Row data to edit:", row.original);
            form.reset({
              firstName: row.original.profile?.firstName,
              lastName: row.original.profile?.lastName,
              email: row.original.email,
              status: row.original.status,
              phone: row.original.phone,
              address: row.original.profile?.address ?? "",
            });
            setOpenEditDialog(true);
          }}
        />
      </TooltipWrapper>

      <TooltipWrapper content="Delete">
        <ActionBtn
          icon={<Trash size={12} />}
          onClick={() => {
            console.log("Row data to delete:", row.original);
            if (row.original.status === AccountStatus.DISABLED) {
              setOpenDeleteDialog(false);
              toast.error("Cannot delete disabled account");
            }
            setOpenDeleteDialog(true);
          }}
        />
      </TooltipWrapper>
      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => setOpenDeleteDialog(open)}
        onConfirm={() => handleDeleteCustomer(row.original.id)}
        isDisabled={row.original.status === AccountStatus.DISABLED}
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
