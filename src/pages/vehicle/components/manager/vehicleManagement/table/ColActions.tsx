import type { Row } from "@tanstack/react-table";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import type { Vehicle } from "@/types/models/vehicle";
import { useState } from "react";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { toast } from "sonner";
import { ViewDetailDialog } from "@/components/dialog/ViewDetailDialog";
import { ViewDetailVehicle } from "../ViewDetailVehicleInfo";
import VehicleInfoForm from "../VehicleInfoForm";
import useVehicles from "@/services/manager/hooks/useVehicles";
import {
  useGetVehicleBrand,
  useGetVehicleModel,
} from "@/services/manager/queries/index";
import { AccountRole } from "@/types/enums/role";

export interface ColActionsProps {
  row: Row<Vehicle>;
  currentPage: number;
  currentPageSize: number;
  currentUserRole: AccountRole;
}

export default function ColActions({
  row,
  currentPage,
  currentPageSize,
  currentUserRole,
}: ColActionsProps) {
  const { data: fetchedBrands } = useGetVehicleBrand();
  const brandId = fetchedBrands?.find(
    (brand) => brand.name === row.original.brand,
  )?.id;
  const { data: fetchedModels } = useGetVehicleModel(Number(brandId));
  const modelId = fetchedModels?.find(
    (model) => model.name === row.original.model,
  )?.id;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { handleDelete, handleEdit, form } = useVehicles(
    row.original.customerId,
    row.original,
    currentPage,
    currentPageSize,
  );

  const vehicle = row.original;

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
      {currentUserRole === "ADMIN" && (
        <>
          <TooltipWrapper content="Edit">
            <ActionBtn
              icon={<Pencil size={12} />}
              onClick={() => {
                console.log("Row data to edit:", row.original);
                form.reset({
                  ...vehicle,
                  modelId: String(modelId),
                  brandId: String(brandId),
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
                if (row.original.status === "INACTIVE") {
                  toast.error("Can not delete inactive vehicle");
                  setOpenDeleteDialog(false);
                } else {
                  setOpenDeleteDialog(true);
                }
              }}
            />
          </TooltipWrapper>
        </>
      )}
      <ViewDetailDialog
        open={openViewDialog}
        onOpenChange={(open) => setOpenViewDialog(open)}
        title="Vehicle Detail Information"
        styleContent="md:max-w-[660px]"
      >
        <ViewDetailVehicle vehicleId={row.original.id} />
      </ViewDetailDialog>

      <VehicleInfoForm
        open={openEditDialog}
        onOpenChange={(open) => setOpenEditDialog(open)}
        onConfirm={handleEdit}
        form={form}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => setOpenDeleteDialog(open)}
        onConfirm={() => {
          handleDelete(row.original.id);
          setOpenDeleteDialog(false);
        }}
        isDisabled={row.original.status === "INACTIVE"}
      />
    </div>
  );
}
