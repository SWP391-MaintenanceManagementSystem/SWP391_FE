import { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useBookingDetail } from "@/services/booking/hooks/useBookingDetail";
import BookingTag from "@/components/tag/BookingTag";
import type { BookingStatus } from "@/types/enums/bookingStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Button } from "@/components/ui/button";
import CustomerInfoCard from "./CustomerInfoCard";
import VehicleInfoCard from "./VehicleInfoCard";
import AssignerInfoCard from "./AssignerInfoCard";
import CheckListModal from "./CheckListModal";
import { useGetVehicleHandover } from "@/services/vehicle-handover/hooks/useGetVehicleHandover";
import ShiftInfoCard from "./ShiftInfoCard";
import CheckInModal from "./CheckInModal";
import { toast } from "sonner";

export default function AssignedBookingDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useBookingDetail(id ?? "");
  const { data: handoverData, isLoading: handoverLoading } =
    useGetVehicleHandover(id ?? "");
  const [isHandoverOpen, setIsHandoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleViewHandover = () => {
    if (!handoverData) {
      toast.warning("No checkin form available");
      return;
    }
    setIsHandoverOpen(true);
  };

  if (!id) {
    return <div className="text-red-500 p-6">Booking ID is missing</div>;
  }

  if (isLoading || handoverLoading) {
    return (
      <div className="text-gray-500 p-6 flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-32px)] font-inter bg-gradient-to-br">
      <DynamicBreadcrumbs
        pathTitles={{
          booking: "Booking Services",
          [id]: "Booking Details",
        }}
      />

      <MainContentLayout className="p-6 font-inter">
        <Card className="mb-6 bg-purple-50 border-purple-200 dark:bg-purple-800 dark:border-purple-800 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Booking Details
              </CardTitle>
              <p>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-300 text-xs">
                  ID: {data?.id || "N/A"}
                </span>
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="border-purple-500 text-purple-600 hover:bg-purple-50
                  dark:border-purple-300 dark:text-purple-200 dark:hover:bg-purple-700/30"
              >
                View Task
              </Button>
              <Button
                onClick={handleViewHandover}
                variant="outline"
                className="border-purple-500 text-purple-600 hover:bg-purple-50
                  dark:border-purple-300 dark:text-purple-200 dark:hover:bg-purple-700/30"
              >
                View Checkin Form
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row justify-between text-gray-700 dark:text-gray-50 space-y-4 md:space-y-0">
              <p>
                <strong>Status:</strong>{" "}
                <BookingTag status={data?.status as BookingStatus} />
              </p>
              <p>
                <strong>Center:</strong> {data?.serviceCenter?.name || "N/A"} -{" "}
                {data?.serviceCenter?.address || "N/A"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between text-gray-700 dark:text-gray-50 space-y-4 md:space-y-0">
              <p>
                <strong>Total Cost:</strong>{" "}
                {data?.totalCost
                  ? `$${Number(data.totalCost).toLocaleString("en-US")}`
                  : "No cost information available."}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {data?.bookingDate
                  ? dayjs(data.bookingDate).format("DD/MM/YYYY HH:mm")
                  : "N/A"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between text-gray-700 dark:text-gray-50 space-y-4 md:space-y-0">
              <p>
                <strong>Note:</strong> {data?.note}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomerInfoCard
            firstName={data?.customer?.firstName}
            lastName={data?.customer?.lastName}
            email={data?.customer?.email}
            phone={data?.customer?.phone}
          />

          <VehicleInfoCard
            id={data?.vehicle?.id}
            licensePlate={data?.vehicle?.licensePlate}
            vin={data?.vehicle?.vin}
            model={data?.vehicle?.model}
            brand={data?.vehicle?.brand}
            productionYear={data?.vehicle?.productionYear}
          />

          <ShiftInfoCard
            shift={{
              id: data?.shift?.id ?? "",
              name: data?.shift?.name ?? "N/A",
              startTime: data?.shift?.startTime
                ? new Date(data.shift.startTime)
                : new Date(),
              endTime: data?.shift?.endTime
                ? new Date(data.shift.endTime)
                : new Date(),
            }}
          />

          <AssignerInfoCard
            firstName={data?.staff?.firstName}
            lastName={data?.staff?.lastName}
            email={data?.staff?.email}
          />
        </div>

        <CheckListModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          bookingData={data}
        />

        {/* Modal */}
        {handoverData && (
          <CheckInModal
            open={isHandoverOpen}
            onOpenChange={setIsHandoverOpen}
            handover={handoverData}
          />
        )}
      </MainContentLayout>
    </div>
  );
}
