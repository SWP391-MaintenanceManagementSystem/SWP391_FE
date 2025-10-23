import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useBookingDetail } from "@/services/booking/hooks/useBookingDetail";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VehicleInfoCard from "./VehicleInfoCard";
import StaffCard from "./StaffCard";
import { StatusBadge } from "./StatusBadge";
import dayjs from "dayjs";
import CustomerInfoCard from "./CustomerInfoCard";
import TechnicianCard from "./TechnicianCard";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useBookingDetail(id ?? "");

  if (!id) {
    return <div className="text-red-500 p-6">Booking ID is missing</div>;
  }

  if (isLoading)
    return (
      <div className="text-gray-500 p-6 flex justify-center items-center h-full">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full min-h-[calc(100vh-32px)] font-inter bg-gradient-to-br ">
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
            {/* <div className="space-x-2">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Edit
              </Button>
              <Button variant="destructive" className="hover:bg-red-600">
                Cancel
              </Button>
            </div> */}
          </CardHeader>
          <CardContent className="p-4 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row justify-between text-gray-700 dark:text-gray-50 md:space-y-0 space-y-4">
              <p>
                <strong>Status:</strong> <StatusBadge status={data?.status} />
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
