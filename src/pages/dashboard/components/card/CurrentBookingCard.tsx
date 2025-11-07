import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Car, User, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { useGetTechnicianCurrentBooking } from "@/services/dashboard/queries/technician";

export default function CurrentBookingCard() {
  const { data, isLoading } = useGetTechnicianCurrentBooking();

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

  const { customer, vehicle, bookingDate, status, staff } = data;
  const startTime = format(new Date(bookingDate), "hh:mm a");

  return (
    <Card className="w-full p-5 shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Current Booking</h2>

        <Badge
          className="bg-orange-500 text-white px-3 py-1 rounded-full"
          variant="outline"
        >
          {status}
        </Badge>
      </div>

      {/* Info grid */}
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
          <p className="font-semibold">{data.serviceCenter?.name || "N/A"}</p>
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
        <Button className="bg-purple-primary-dark hover:bg-purple-300 dark:text-amber-primary text-white flex-1 py-2 rounded-lg shadow-sm">
          View Tasks
        </Button>

        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2 py-2 border-gray-300 hover:bg-gray-50 rounded-lg"
        >
          <span className="material-symbols-outlined text-sm"></span>
          View Detail
        </Button>
      </div>
    </Card>
  );
}
