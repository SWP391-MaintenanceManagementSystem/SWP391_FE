import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import { useGetVehicleById } from "@/services/manager/queries";
import MainContentLayout from "@/components/MainContentLayout";
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
          <h2 className="text-2xl font-bold">History Booking</h2>
          <p className="text-gray-500">This is the history booking page.</p>
        </div>
      </MainContentLayout>
    </div>
  );
}
