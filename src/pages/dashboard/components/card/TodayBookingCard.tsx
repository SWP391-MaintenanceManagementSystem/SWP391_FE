import BookingTag from "@/components/tag/BookingTag";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useBooking from "@/services/booking/hooks/useStaffBooking";
import { encodeBase64 } from "@/utils/base64";
import dayjs from "dayjs";
import { MoveUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function TodayBookingCard() {
  const { bookingData, isLoading } = useBooking({
    page: 1,
    pageSize: 100,
    bookingDate: dayjs().format("YYYY-MM-DD"),
    sortBy: "bookingDate",
    orderBy: "asc",
  });

  return (
    <Card className="shadow-sm rounded-xl gap-1.5 border border-gray-200 dark:border-[#2b2b2b]">
      <CardHeader>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-64" />
          </div>
        ) : (
          <>
            <CardTitle>Today’s Appointments</CardTitle>
            <p className="text-sm text-muted-foreground">
              Your scheduled bookings for{" "}
              <strong>{dayjs().format("MMMM D, YYYY")}</strong>
            </p>
          </>
        )}
      </CardHeader>

      <CardContent className="divide-y max-h-[180px] h-[160px] overflow-y-auto flex flex-col">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="py-3 flex items-start justify-between gap-1.5"
              >
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </>
        ) : bookingData?.data.length ? (
          bookingData?.data.map((b) => (
            <div
              key={b.id}
              className="py-3 gap-1.5 flex items-start justify-between"
            >
              <div>
                <p className="text-lg font-semibold">
                  {dayjs(b.bookingDate).format("HH:mm")} -{" "}
                  {b.customer.firstName} {b.customer.lastName}
                </p>
                <div className="space-x-2">
                  <Badge variant={"outline"}> {b.vehicle.licensePlate}</Badge>
                  <BookingTag status={b.status} />
                </div>
              </div>
              <NavLink to={`/booking/${encodeBase64(b.id)}`}>
                <p className="text-xs hover:underline mt-1.5 flex text-center gap-0.5 text-purple-600">
                  View Details
                  <MoveUpRight size={14} />
                </p>
              </NavLink>
            </div>
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground text-center">
              No bookings for today.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
