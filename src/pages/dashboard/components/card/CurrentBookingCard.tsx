import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Car, User, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { useGetTechnicianCurrentBooking } from "@/services/dashboard/queries/technician";
import CheckListModal from "@/pages/booking/components/technician/booking-detail/CheckListModal";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export default function CurrentBookingCard() {
  const { data, isLoading } = useGetTechnicianCurrentBooking();
  const [openChecklist, setOpenChecklist] = useState(false);
  const navigate = useNavigate();

  const getStatusBadgeStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "in progress":
        return `
        bg-orange-100 text-orange-800 border border-orange-300
        dark:bg-orange-900/40 dark:text-orange-200 dark:border-orange-700/50
      `;
      case "assigned":
        return `
        bg-blue-100 text-blue-800 border border-blue-300
        dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-700/50
      `;
      default:
        return `
        bg-gray-100 text-gray-700 border border-gray-300
        dark:bg-gray-800/40 dark:text-gray-300 dark:border-gray-700/50
      `;
    }
  };
  const handleViewDetail = (bookingId: string) => {
    if (bookingId) {
      navigate(`/booking/${bookingId}`);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full p-4">
        <Skeleton className="h-6 w-1/3 mb-3" />
        <Skeleton className="h-5 w-1/2 mb-1" />
        <Skeleton className="h-5 w-1/4 mb-1" />
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full p-4">
        <CardHeader className="p-0 mb-2">
          <CardTitle>Current Booking</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-gray-500 text-sm">No active booking found.</p>
        </CardContent>
      </Card>
    );
  }

  const { id, customer, vehicle, bookingDate, status, staff, serviceCenter } =
    data;
  const startTime = format(new Date(bookingDate), "hh:mm a");

  return (
    <>
      <Card className="w-full p-5 shadow-md border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Current Booking</h2>

          <Badge
            className={clsx(
              "px-3 py-1 rounded-full text-sm font-medium",
              getStatusBadgeStyle(status)
            )}
          >
            {status}
          </Badge>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" /> Customer
            </p>
            <p className="font-semibold">
              {customer.firstName} {customer.lastName}
            </p>
          </div>

          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-gray-400" /> Assigner
            </p>
            <p className="font-semibold">
              {staff?.firstName} {staff?.lastName || ""}
            </p>
          </div>

          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <Car className="w-4 h-4 text-gray-400" /> Vehicle
            </p>
            <p className="font-semibold">
              {vehicle.brand} {vehicle.model} — {vehicle.licensePlate}
            </p>
          </div>

          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" /> Service Center
            </p>
            <p className="font-semibold">{serviceCenter?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" /> Start Time
            </p>
            <p className="font-semibold">{startTime}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            className="bg-purple-primary-dark dark:text-amber-primary hover:bg-purple-300 text-white flex-1 py-2 rounded-lg shadow-sm"
            onClick={() => setOpenChecklist(true)}
          >
            View Tasks
          </Button>

          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 py-2 border-gray-300 hover:bg-gray-50 rounded-lg"
            onClick={() => handleViewDetail(id)}
          >
            View Detail
          </Button>
        </div>
      </Card>

      {/* Checklist Modal */}
      <CheckListModal open={openChecklist} onOpenChange={setOpenChecklist} />
    </>
  );
}
