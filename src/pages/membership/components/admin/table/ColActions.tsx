import type { Row } from "@tanstack/react-table";
import { Pencil, Trash2, Eye } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { useState, useEffect } from "react";
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
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  useEffect(() => {
    if (openEdit) form.reset(membership);
  }, [openEdit, membership, form]);

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
      <ActionBtn icon={<Pencil size={12} />} onClick={() => setOpenEdit(true)} />
      <ActionBtn icon={<Trash2 size={12} />} onClick={() => setOpenDelete(true)} />

      {/* View */}
      <ViewDetailDialog
        open={openView}
        onOpenChange={setOpenView}
        title={`Membership - ${membership.name}`}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputDisableWithLabel label="Name" id="name" value={membership.name} />
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
        onConfirm={form.handleSubmit(handleConfirmEdit)}
        form={form}
        title="Membership"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter membership name"
                    className="border border-input bg-background text-foreground rounded-md w-full text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    placeholder="Enter price"
                    className="border border-input bg-background text-foreground rounded-md w-full text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter duration"
                    className="border border-input bg-background text-foreground rounded-md w-full text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Period Type */}
          <FormField
            control={form.control}
            name="periodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Period Type</FormLabel>
                <Select
                  onValueChange={(value: Membership["periodType"]) =>
                    form.setValue("periodType", value, { shouldDirty: true })
                  }
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger className="border border-input bg-background text-foreground rounded-md w-full text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none h-[38px] px-2">
                      <SelectValue placeholder="Select Period Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DAY">DAY</SelectItem>
                    <SelectItem value="MONTH">MONTH</SelectItem>
                    <SelectItem value="YEAR">YEAR</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={(value: Membership["status"]) =>
                    form.setValue("status", value, { shouldDirty: true })
                  }
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger className="border border-input bg-background text-foreground rounded-md w-full text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none h-[38px] px-2">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
