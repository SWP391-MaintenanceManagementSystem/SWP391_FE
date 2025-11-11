import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import { useGetVehicleById } from "@/services/manager/queries";
import MainContentLayout from "@/components/MainContentLayout";
import HistoryBookingTable from "./table/HistoryBookingTable";
import VehicleCardDetail from "./VehicleCardDetail";
export default function HistoryBookingCus() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const decodedVehicleId = vehicleId ? b64DecodeUnicode(vehicleId) : null;
  const { data: vehicle } = useGetVehicleById(decodedVehicleId || "");
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "My Vehicles",
          [vehicleId ?? ""]: `${vehicle?.licensePlate || ""}`,
        }}
        ignorePaths={["history"]}
      />
      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 pt-4">
        <div className="flex flex-col gap-4">
          {vehicle && <VehicleCardDetail vehicle={vehicle} />}
        </div>

        <HistoryBookingTable vehicleId={decodedVehicleId || ""} />
      </MainContentLayout>
    </div>
  );
}
