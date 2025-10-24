import { b64DecodeUnicode } from "@/utils/base64";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useBookingDetail } from "@/services/booking/hooks/useBookingDetail";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VehicleInfoCard from "../customer/booking-detail/VehicleInfoCard";
import StaffCard from "../customer/booking-detail/StaffCard";
import BookingTag from "@/components/tag/BookingTag";
import dayjs from "dayjs";
import CustomerInfoCard from "../customer/booking-detail/CustomerInfoCard";
import TechnicianCard from "../customer/booking-detail/TechnicianCard";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useState } from "react";
import { BookingServicesDialog } from "../customer/booking-detail/BookingServicesDialog";
import { CancelBookingDialog } from "../customer/booking-detail/CancelBookingDialog";
import useCancelBooking from "@/services/booking/hooks/useCancelBooking";
import type { BookingStatus } from "@/types/enums/bookingStatus";
import AssignmentDialog from "./AssignmentDialog";
import { useAssignBooking } from "@/services/booking/hooks/useAssignBooking";

export default function ViewBookingDetail() {
  const { id } = useParams<{ id: string }>();
  const bookingId = b64DecodeUnicode(id ?? "");
  const { data, isLoading } = useBookingDetail(bookingId ?? "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const { onCancel } = useCancelBooking();
  const { form, onSubmit } = useAssignBooking({
    onSuccess: () => {
      setOpenAssignmentDialog(false);
    },
  });

  if (!bookingId) {
    return <div className="text-red-500 p-6">Booking ID is missing</div>;
  }

  if (isLoading)
    return (
      <div className="text-gray-500 p-6 flex justify-center items-center h-full">
        <Spinner />
      </div>
    );

  const handleCancelBooking = () => {
    onCancel(bookingId);
    setIsCancelModalOpen(false);
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

      <DynamicBreadcrumbs
        pathTitles={{
          booking: "Booking Management",
          [id ?? ""]: "Detailed Information",
        }}
      />
      <MainContentLayout className="p-6 max-h-[calc(100vh-60px)] overflow-y-auto">
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
                variant="default"
                className="bg-purple-600 hover:bg-purple-700 text-white
            dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                Vehicle Check-In
              </Button>

              <Button
                onClick={() => setIsCancelModalOpen(true)}
                variant="destructive"
                className="hover:bg-red-600
            dark:hover:bg-red-700"
              >
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row justify-between text-gray-700 dark:text-gray-50 md:space-y-0 space-y-4">
              <p>
                <strong>Status:</strong>{" "}
                <BookingTag status={data?.status as BookingStatus} />
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
          <TechnicianCard
            technicians={data?.technicians}
            onAssign={() => setOpenAssignmentDialog(true)}
            disabled={
              data?.status === "CANCELLED" ||
              data?.status === "CHECKED_OUT" ||
              data?.status === "COMPLETED" ||
              data?.status === "IN_PROGRESS"
            }
          />
        </div>
      </MainContentLayout>
      <AssignmentDialog
        open={openAssignmentDialog}
        onOpenChange={(open) => setOpenAssignmentDialog(open)}
        form={form}
        onConfirm={async (values) => {
          await onSubmit({ ...values, bookingId });
        }}
        item={data!}
      />
    </div>
  );
}
