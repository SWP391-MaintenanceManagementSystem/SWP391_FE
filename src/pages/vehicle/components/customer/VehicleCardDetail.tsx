import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import vehicleImg from "@/assets/vehicle_img.png";
import type { Vehicle } from "@/types/models/vehicle";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

interface VehicleCardDetailProps {
  vehicle: Vehicle;
}


export default function VehicleCardDetail({ vehicle }: VehicleCardDetailProps) {
    const {auth} = useAuth();
  return (
    <Card className="w-full h-full flex flex-col gap-3 p-4">
      {/* License Plate */}
      <CardHeader className="">
        <CardTitle className="text-2xl font-bold">
           {vehicle.licensePlate || "—"}
        </CardTitle>
      </CardHeader>

      {/* Vehicle Image */}
      <CardContent className="flex flex-col gap-3">
        <img
          src={vehicleImg}
          alt="Vehicle"
          className="w-full h-52 "
        />

        {/* Vehicle Info */}
        <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
            Information
          </h3>
          <p>
             <strong>Email:</strong> {auth.user?.email || "—"}
          </p>
          <p>
            <strong>Brand:</strong> {vehicle.brand || "—"}
          </p>
          <p>
            <strong>Model:</strong> {vehicle.model || "—"}
          </p>
          <p>
            <strong>Vin:</strong> {vehicle.vin || "—"}
          </p>
          <p>
            <strong>Production Year:</strong> {vehicle.productionYear || "—"}
          </p>
          <p className="flex items-center gap-2">
            <strong>Status:</strong>
            <Badge
              variant={
                vehicle.status?.toLowerCase() === "active"
                  ? "default"
                  : "secondary"
              }
              className={`capitalize ${
                vehicle.status?.toLowerCase() === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {vehicle.status || "—"}
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
