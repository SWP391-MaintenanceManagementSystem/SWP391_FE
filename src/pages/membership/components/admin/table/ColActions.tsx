import type { Row } from "@tanstack/react-table";
import { Pencil, Trash2, Eye } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { useState } from "react";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { EditDialog } from "@/components/dialog/EditDialog";
import {
  ViewDetailDialog,
  InputDisableWithLabel,
} from "@/components/dialog/ViewDetailDialog";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import type { Membership } from "@/types/models/membership";
import useMembership from "@/services/membership/hooks/useMembership";

type ColActionsProps = {
  row: Row<Membership>;
  currentPage: number;
  currentPageSize: number;
};

export default function ColActions({ row }: ColActionsProps) {
  const membership = row.original;
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { onUpdateMembership, onDeleteMembership } = useMembership();

  const form = useForm<Membership>({
    defaultValues: membership,
  });

  const handleConfirmEdit = (data: Membership) => {
    onUpdateMembership(membership.id, data);
    setOpenEdit(false);
  };

  const handleConfirmDelete = () => {
    onDeleteMembership(membership.id);
    setOpenDelete(false);
    toast.warning(`Deleted membership: ${membership.name}`);
  };

  return (
    <div className="flex gap-1">
      <ActionBtn icon={<Eye size={12} />} onClick={() => setOpenView(true)} />
      <ActionBtn
        icon={<Pencil size={12} />}
        onClick={() => setOpenEdit(true)}
      />
      <ActionBtn
        icon={<Trash2 size={12} />}
        onClick={() => setOpenDelete(true)}
      />

      {/* View */}
      <ViewDetailDialog
        open={openView}
        onOpenChange={setOpenView}
        title={`Membership - ${membership.name}`}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputDisableWithLabel
            label="Name"
            id="name"
            value={membership.name}
          />
          <InputDisableWithLabel
            label="Price"
            id="price"
            value={`$${membership.price}`}
          />
          <InputDisableWithLabel
            label="Duration"
            id="duration"
            value={`${membership.duration} ${membership.periodType}`}
          />
          <InputDisableWithLabel
            label="Status"
            id="status"
            value={membership.status}
          />
          <InputDisableWithLabel
            label="Description"
            id="desc"
            value={membership.description || "N/A"}
          />
        </div>
      </ViewDetailDialog>

      {/* Edit */}
      <EditDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        onConfirm={handleConfirmEdit}
        form={form}
        title="Edit Membership"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Name</label>
            <input
              {...form.register("name")}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              step={0.01}
              {...form.register("price")}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label>Duration</label>
            <input
              type="number"
              {...form.register("duration")}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label>Period Type</label>
            <select
              {...form.register("periodType")}
              className="border p-2 rounded-md w-full"
            >
              <option value="DAY">Day</option>
              <option value="MONTH">Month</option>
              <option value="YEAR">Year</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select
              {...form.register("status")}
              className="border p-2 rounded-md w-full"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </EditDialog>

      {/* Delete */}
      <DeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
