import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";

export default function VehicleDetailPage() {
  const { customerId, vehicleId } = useParams<{
    customerId: string;
    vehicleId: string;
  }>();

  const decodedCustomerId = customerId ? b64DecodeUnicode(customerId) : null;
  const decodedVehicleId = vehicleId ? b64DecodeUnicode(vehicleId) : null;
  return (
    <div>
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customer & Vehicle Management",
          [customerId ?? ""]: "Customer Detail",
          [vehicleId ?? ""]: "Vehicle Detailed Information",
        }}
      />
      <div className="p-4">
        <p>Customer ID: {decodedCustomerId}</p>
        <p>Vehicle ID: {decodedVehicleId}</p>
      </div>
    </div>
  );
}
