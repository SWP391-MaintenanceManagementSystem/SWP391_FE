import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useBookingDetail } from "@/services/booking/hooks/useBookingDetail";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VehicleInfoCard from "./VehicleInfoCard";
import StaffCard from "./StaffCard";
import dayjs from "dayjs";
import CustomerInfoCard from "./CustomerInfoCard";
import TechnicianCard from "./TechnicianCard";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useState } from "react";
import { BookingServicesDialog } from "./BookingServicesDialog";
import { CancelBookingDialog } from "./CancelBookingDialog";
import useCancelBooking from "@/services/booking/hooks/useCancelBooking";
import BookingTag from "@/components/tag/BookingTag";
import EditBookingModal from "./EditBookingModal";
import { BookingStatus } from "@/types/enums/bookingStatus";
import { b64DecodeUnicode } from "@/utils/base64";
import { usePayment } from "@/services/payment/hooks/usePayment";

const CAN_CANCEL: BookingStatus[] = [
  BookingStatus.PENDING,
  BookingStatus.ASSIGNED,
];
export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();

  const decodedId = b64DecodeUnicode(id!);
  const { data, isLoading } = useBookingDetail(decodedId ?? "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { paymentMutation } = usePayment();
  const { onCancel } = useCancelBooking();
  if (!id) {
    return <div className="text-red-500 p-6">Booking ID is missing</div>;
  }

  if (isLoading || paymentMutation.isPending)
    return (
      <div className="text-gray-500 p-6 flex justify-center items-center h-full">
        <Spinner />
      </div>
    );

  const handleCancelBooking = () => {
    onCancel(decodedId);
    setIsCancelModalOpen(false);
  };

  const handleCheckout = () => {
    paymentMutation.mutate({
      referenceId: decodedId,
      referenceType: "BOOKING",
      amount: data?.totalCost || 0,
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-32px)] font-inter bg-gradient-to-br ">
      <BookingServicesDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        services={data?.bookingDetails?.services}
        packages={data?.bookingDetails?.packages}
      />

      <CancelBookingDialog
        open={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        onConfirm={handleCancelBooking}
      />

      {data && (
        <EditBookingModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          booking={data}
        />
      )}

      <DynamicBreadcrumbs
        pathTitles={{
          booking: "Booking Services",
          [id]: "Booking Details",
        }}
      />
      <MainContentLayout className="p-6">
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
            {data?.status !== BookingStatus.COMPLETED ? (
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  className="border-purple-500 text-purple-600 hover:bg-purple-50
            dark:border-purple-300 dark:text-purple-200 dark:hover:bg-purple-700/30"
                >
                  View Services
                </Button>

                <Button
                  onClick={() => setIsEditModalOpen(true)}
                  variant="default"
                  disabled={!(data?.status && CAN_CANCEL.includes(data.status))}
                  className="bg-purple-600 hover:bg-purple-700 text-white
            dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                  Edit
                </Button>

                <Button
                  onClick={() => setIsCancelModalOpen(true)}
                  variant="destructive"
                  disabled={!(data?.status && CAN_CANCEL.includes(data.status))}
                  className="hover:bg-red-600
            dark:hover:bg-red-700"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleCheckout}
                  disabled={paymentMutation.isPending}
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-purple-50 hover:text-green-700
            dark:border-purple-300 dark:text-purple-200 dark:hover:bg-purple-700/30"
                >
                  Checkout
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-4 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row justify-between text-gray-700 dark:text-gray-50 md:space-y-0 space-y-4">
              <p>
                <strong>Status:</strong>{" "}
                {data?.status && <BookingTag status={data.status} />}
              </p>
              <p>
                <strong>Center: </strong> {data?.serviceCenter?.name || "N/A"} -{" "}
                {data?.serviceCenter?.address || "N/A"}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between text-gray-700 dark:text-gray-50 md:space-y-0 space-y-4">
              <p>
                <strong>Total Cost:</strong> $
                {Number(data?.totalCost).toLocaleString("en-US") ||
                  "No cost information available."}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {dayjs(data?.bookingDate).format("DD/MM/YYYY HH:mm") || "N/A"}
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
          <StaffCard staff={data?.staff} />
          <TechnicianCard technicians={data?.technicians} />
        </div>
      </MainContentLayout>
    </div>
  );
}
