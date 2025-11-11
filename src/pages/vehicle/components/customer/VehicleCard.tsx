import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import vehicleImg from "@/assets/vehicle_img.png";
import type { Vehicle } from "@/types/models/vehicle";
import { Trash } from "lucide-react";
import dayjs from "dayjs";
import { useState } from "react";
import DeleteAlertDialog from "./DeleteAlertDialog";
import useVehicles from "@/services/vehicle/hooks/useVehicles";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router-dom";
import { encodeBase64 } from "@/utils/base64";

type VehicleCardProps = {
  vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const { onDeleteVehicle, isLoading } = useVehicles();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDeleteVehicle(vehicle.id);
  };

  const handleBookService = () => {
    navigate("/booking", { state: { vehicleId: vehicle.id } });
  };

  const handleViewHistory = () => {
    const encodedId = encodeBase64(vehicle.id);
    navigate(`/vehicles/history/${encodedId}`, {
      state: { vehicleId: encodedId },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {deleteModalOpen && (
        <DeleteAlertDialog
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onDelete={handleDelete}
        />
      )}
      <Card className="w-full max-w-sm md:max-w-xs lg:max-w-[368px] h-fit">
        <CardHeader>
          <CardTitle className="dark:text-white relative flex items-center">
            <Trash
              className="h-4 w-4 absolute right-0 top-0 cursor-pointer text-gray-primary"
              onClick={() => setDeleteModalOpen(true)}
            />
            {vehicle.licensePlate}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <img
            src={vehicleImg}
            alt="Vehicle Image"
            className="w-full h-48 object-contain rounded "
          />
          <CardDescription className="flex flex-col gap-1 lg:text-md text-xs">
            <span>
              <strong className="text-black dark:text-white">Model:</strong>{" "}
              {vehicle.model}
            </span>
            <span>
              <strong className="text-black dark:text-white">Brand:</strong>{" "}
              {vehicle.brand}
            </span>
            <span>
              <strong className="text-black dark:text-white">VIN:</strong>{" "}
              {vehicle.vin}
            </span>

            <span>
              <strong className="text-black dark:text-white">
                Last Service:
              </strong>{" "}
              {vehicle.lastService
                ? dayjs(vehicle.lastService).format("DD/MM/YYYY")
                : "N/A"}
            </span>
          </CardDescription>
        </CardContent>
        <CardFooter className="flex gap-2 justify-around flex-wrap">
          <Button
            variant={"outline"}
            className="flex-1 min-w-[120px] text-purple-primary"
            onClick={handleBookService}
          >
            Book Service
          </Button>
          <Button
            variant={"outline"}
            className="flex-1 min-w-[120px] text-purple-primary"
            onClick={handleViewHistory}
          >
            View History
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
