import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import MainContentLayout from "@/components/MainContentLayout";
import VehicleInfoBox from "./VehicleInfoBox";

export default function VehicleDetailPage() {
  const { customerId, vehicleId } = useParams<{
    customerId: string;
    vehicleId: string;
  }>();
  const decodedVehicleId = vehicleId ? b64DecodeUnicode(vehicleId) : null;
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customer & Vehicle Management",
          [customerId ?? ""]: "Customer Detail",
          [vehicleId ?? ""]: "Vehicle Detail",
        }}
      />
      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 pt-4">
        <VehicleInfoBox vehicleId={decodedVehicleId || ""} />
        <div>
          <h1 className="text-2xl font-bold mb-4">Vehicle Detail</h1>
          <p className="text-gray-600">Vehicle ID: {decodedVehicleId}</p>
        </div>
      </MainContentLayout>
    </div>
  );
}
