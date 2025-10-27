import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetVehicleById } from "@/services/manager/queries";
import VehicleStatusTag from "@/components/tag/VehicleStatusTag";
import vehicleImg from "@/assets/vehicle_img.png";
import dayjs from "dayjs";
import { useGetCustomerById } from "@/services/manager/queries";
import { InfoSection } from "@/pages/profile/components/InfoSection";
type VehicleInfoBoxProps = {
  vehicleId: string;
};

const VehicleInfoBox = ({ vehicleId }: VehicleInfoBoxProps) => {
  const { data: vehicle } = useGetVehicleById(vehicleId);
  const { data: customer } = useGetCustomerById(vehicle?.customerId || "");

  console.log(vehicle);
  return (
    <Card className="w-full max-w-sm md:max-w-xs lg:max-w-[368px] h-full">
      <CardHeader>
        <CardTitle className="dark:text-white relative flex items-center text-xl">
          {vehicle?.licensePlate}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <img
          src={vehicleImg}
          alt="Vehicle Image"
          className="w-full h-40 object-cover rounded "
        />
        <InfoSection title="Information">
          <p>
            <strong>Owner: </strong>
            {customer?.profile
              ? `${customer.profile.firstName} ${customer.profile.lastName}`
              : ""}
          </p>

          <p>
            <strong>Email: </strong>
            {customer?.email || ""}
          </p>
          <p>
            <strong>Brand: </strong>
            {vehicle?.brand || ""}
          </p>
          <p>
            <strong>Model: </strong>
            {vehicle?.model || ""}
          </p>
          <p>
            <strong>Vin: </strong>
            {vehicle?.vin || ""}
          </p>
          <p className="font-inter flex flex-row gap-2">
            <strong className="font-inter">Status:</strong>
            <span className="inline-flex">
              {vehicle?.status && <VehicleStatusTag status={vehicle.status} />}
            </span>
          </p>
          <p>
            <strong>Created: </strong>
            {dayjs(vehicle?.createdAt).format("HH:mm:ss DD/MM/YYYY") || ""}
          </p>
          <p>
            <strong>Updated: </strong>
            {dayjs(vehicle?.updatedAt).format("HH:mm:ss DD/MM/YYYY") || ""}
          </p>
        </InfoSection>
      </CardContent>
    </Card>
  );
};

export default VehicleInfoBox;
