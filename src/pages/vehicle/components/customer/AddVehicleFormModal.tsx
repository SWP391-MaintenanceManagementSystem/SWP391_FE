import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { type AddVehicleFormData } from "../libs/schema";
import {
  getVehicleBrands,
  getVehicleModelsByBrand,
} from "@/services/vehicle/apis/vehicle.api";
import type { VehicleBrand, VehicleModel } from "@/types/models/vehicle";
import type { useForm } from "react-hook-form";

type AddVehicleFormModalProps = {
  onClose: () => void;
  open: boolean;
  form: ReturnType<typeof useForm<AddVehicleFormData>>;
  onSubmit: (data: AddVehicleFormData) => void;
};

export default function AddVehicleFormModal({
  onClose,
  open,
  form,
  onSubmit,
}: AddVehicleFormModalProps) {
  const [brands, setBrands] = useState<VehicleBrand[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await getVehicleBrands();
      setBrands(response.data.data);
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const brandId = form.watch("brandId");
    if (brandId) {
      const fetchModels = async () => {
        const response = await getVehicleModelsByBrand(brandId);
        setModels(response.data.data);
      };
      fetchModels();
    } else {
      setModels([]);
    }
  }, [form.watch("brandId")]);

  const handleAddVehicle = (values: AddVehicleFormData) => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddVehicle)}
            className="flex flex-col gap-4 font-inter"
          >
            <FormField
              control={form.control}
              name="vin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VIN</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="Enter VIN"
                    />
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
                    <input
                      type="text"
                      {...field}
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="Enter license plate"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue
                            placeholder="Select brand"
                            className="text-black"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {brands &&
                            brands.map((brand) => (
                              <SelectItem
                                key={brand.id}
                                value={String(brand.id)}
                              >
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
                        disabled={!form.watch("brandId")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {models &&
                            models.map((model) => (
                              <SelectItem
                                key={model.id}
                                value={String(model.id)}
                              >
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
            </div>

            <button
              type="submit"
              className="w-full bg-purple-primary text-white dark:text-amber-primary rounded-md py-2 hover:opacity-90"
            >
              Submit
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
