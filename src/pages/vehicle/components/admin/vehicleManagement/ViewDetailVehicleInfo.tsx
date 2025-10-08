import {
  InfoSection,
  InputDisableWithLabel,
} from "@/components/dialog/ViewDetailDialog";
import {
  useGetVehicleById,
  useGetCustomerById,
} from "@/services/manager/queries";
import VehicleStatusTag from "@/components/tag/VehicleStatusTag";
import { Loader } from "lucide-react";
import "animate.css";

type ViewDetailVehicleProps = {
  vehicleId: string;
};

export function ViewDetailVehicle({ vehicleId }: ViewDetailVehicleProps) {
  const { data: vehicle, isLoading } = useGetVehicleById(vehicleId);
  const customerId = vehicle?.customerId;
  const { data: customer } = useGetCustomerById(customerId || "");
  const name = customer?.profile?.firstName + " " + customer?.profile?.lastName;

  return (
    <div className="min-h-[300px]">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader className="animate-spin text-gray-500 " />
        </div>
      ) : (
        <div className="flex flex-col gap-10 overflow-y-auto md:max-h-[700px] max-h-[480px]">
          <InfoSection
            title="Vehicle Information"
            styleFormLayout="md:grid-cols-2 md:grid-rows-3"
          >
            <InputDisableWithLabel
              label="Model"
              value={vehicle?.model || ""}
              id="model"
            />
            <InputDisableWithLabel
              label="VIN"
              value={vehicle?.vin || ""}
              id="vin"
            />
            <InputDisableWithLabel
              label="License Plate"
              value={vehicle?.licensePlate || ""}
              id="licensePlate"
            />
            <InputDisableWithLabel
              label="Brand"
              value={vehicle?.brand || ""}
              id="brand"
            />
            <InputDisableWithLabel
              label="Status"
              value={
                vehicle?.status ? (
                  <VehicleStatusTag status={vehicle.status} />
                ) : (
                  ""
                )
              }
              id="status"
            />
            <InputDisableWithLabel
              label="Owner"
              value={name || ""}
              id="owner"
            />
          </InfoSection>
        </div>
      )}
    </div>
  );
}
