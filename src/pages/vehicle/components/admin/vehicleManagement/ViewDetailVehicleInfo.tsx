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
import dayjs from "dayjs";

type ViewDetailVehicleProps = {
  vehicleId: string;
};

export function ViewDetailVehicle({ vehicleId }: ViewDetailVehicleProps) {
  const { data: vehicle, isLoading } = useGetVehicleById(vehicleId);
  const { data: customer } = useGetCustomerById(vehicle?.customerId || "");
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
          <InfoSection
            title="Service Information"
            styleFormLayout="md:grid-cols-2 md:grid-rows-3"
          >
            <InputDisableWithLabel
              label="Last Service"
              value={dayjs(vehicle?.lastService).format("YYYY-MM-DD") || ""}
              id="lastService"
            />
            <InputDisableWithLabel
              label="Next Appointment"
              value="next appointment"
              id="nextAppointment"
            />
            <InputDisableWithLabel
              label="Technican"
              value="Technican"
              id="lastService"
            />
            <InputDisableWithLabel
              label="Service Package"
              value="Service Package"
              id="servicePakage"
            />
            <InputDisableWithLabel
              label="Service Details"
              value="Service Details"
              id="serviceDetail"
              styleFormat="md:col-span-2"
            />
          </InfoSection>
        </div>
      )}
    </div>
  );
}
