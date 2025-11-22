import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarFront } from "lucide-react"; // Thêm icon từ lucide-react

interface VehicleInfoCardProps {
  id?: string;
  licensePlate?: string;
  vin?: string;
  model?: string;
  brand?: string;
  productionYear?: number;
}

export default function VehicleInfoCard({
  licensePlate,
  vin,
  model,
  brand,
  productionYear,
}: VehicleInfoCardProps) {
  return (
    <Card className="hover:shadow-lg p-0 dark:hover:shadow-gray-700 transition-shadow duration-300 border border-gray-200 dark:border-[#262626] rounded-lg">
      <CardHeader className="flex rounded-t-lg flex-row items-center  gap-2 p-4 bg-gradient-to-r from-purple-50 to-gray-50 dark:from-purple-800 dark:to-purple-500">
        <CarFront className="w-6 h-6 text-purple-500 dark:text-purple-100" />
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          {licensePlate || "N/A"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-4">
        <CardDescription className="flex flex-col gap-2 text-gray-700 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600 dark:text-gray-200 w-24">
              Model:
            </span>
            <span className="text-gray-900 dark:text-gray-200">
              {model || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600 w-24 dark:text-gray-200">
              Brand:
            </span>
            <span className="text-gray-900 dark:text-gray-200">
              {brand || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600 w-24 dark:text-gray-200">
              VIN:
            </span>
            <span className="text-gray-900 dark:text-gray-200">
              {vin || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600 w-24 dark:text-gray-200">
              Year:
            </span>
            <span className="text-gray-900 dark:text-gray-200">
              {productionYear || "N/A"}
            </span>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
