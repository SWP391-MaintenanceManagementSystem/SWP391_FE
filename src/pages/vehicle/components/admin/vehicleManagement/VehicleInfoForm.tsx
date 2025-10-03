import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { EditDialog } from "@/components/dialog/EditDialog";
import VehicleStatusTag from "@/components/tag/VehicleStatusTag";
import type { AddVehicleFormData } from "../../libs/schema";
import type {
  VehicleBrand,
  VehicleModel,
  VehicleStatus,
} from "@/types/models/vehicle";
import { useEffect, useState } from "react";
import {
  useGetVehicleBrand,
  useGetVehicleModel,
} from "@/services/manager/queries";

interface VehicleInfoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: AddVehicleFormData) => void;
  form: ReturnType<typeof useForm<AddVehicleFormData>>;
}

export default function VehicleInfoForm({
  open,
  onOpenChange,
  onConfirm,
  form,
}: VehicleInfoFormProps) {
  const [brands, setBrands] = useState<VehicleBrand[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);
  const brandId = form.watch("brandId");
  const { data: fetchedBrands } = useGetVehicleBrand();
  const { data: fetchedModels } = useGetVehicleModel(Number(brandId));
  useEffect(() => {
    if (fetchedBrands) {
      setBrands(fetchedBrands);
    }
  }, [fetchedBrands]);

  useEffect(() => {
    if (brandId && fetchedModels) {
      setModels(fetchedModels);
    } else {
      setModels([]);
    }
  }, [brandId, fetchedModels]);
  return (
    <EditDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      form={form}
      title="Vehicle Information"
      styleFormLayout="md:grid-rows-4 md:grid-cols-2"
      styleLayoutFooter="row-start-4 col-start-2"
    >
      <FormField
        control={form.control}
        name="vin"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>VIN</FormLabel>
            <FormControl>
              <Input placeholder="VIN" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="licensePlate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>License Plate</FormLabel>
            <FormControl>
              <Input placeholder="License Plate" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full !outline-none">
                    <VehicleStatusTag status={field.value as VehicleStatus} />
                    <ChevronDown className="mr-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem
                    onSelect={() => {
                      field.onChange("ACTIVE");
                    }}
                  >
                    <VehicleStatusTag status="ACTIVE" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      field.onChange("INACTIVE");
                    }}
                  >
                    <VehicleStatusTag status="INACTIVE" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="brandId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full ">
                  <SelectValue
                    placeholder="Select brand"
                    className="text-black"
                  />
                </SelectTrigger>
                <SelectContent>
                  {brands &&
                    brands.map((brand) => (
                      <SelectItem key={brand.id} value={String(brand.id)}>
                        {brand.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="modelId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Model</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!brandId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {models &&
                    models.map((model) => (
                      <SelectItem key={model.id} value={String(model.id)}>
                        {model.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </EditDialog>
  );
}
