import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TechnicianAssignedBookingTable from "./table/TechnicianAssignedBookingTable";


interface TechnicianAssignedBookingCardProps {
  title?: string;
  bookingData: any;
  isLoading: boolean;
  isFetching: boolean;
}

export default function TechnicianAssignedBookingCard({
  title = "My Assigned Bookings",
  bookingData,
  isLoading,
  isFetching,
}: TechnicianAssignedBookingCardProps) {
  return (
    <Card className="w-full bg-muted/10 border border-muted/30 shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-muted/20">
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>

        {/* small summary on the right */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>
            Today:{" "}
            <strong className="text-blue-400">
              {bookingData?.summary?.today ?? 0}
            </strong>
          </span>
          <span>
            In Progress:{" "}
            <strong className="text-yellow-400">
              {bookingData?.summary?.inProgress ?? 0}
            </strong>
          </span>
          <span>
            Completed:{" "}
            <strong className="text-green-400">
              {bookingData?.summary?.completed ?? 0}
            </strong>
          </span>
        </div>
      </CardHeader>

      {/* Table */}
      <CardContent className="pt-4">
        <TechnicianAssignedBookingTable
          data={bookingData?.data ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          totalPage={bookingData?.totalPages ?? 1}
          pageIndex={bookingData?.page ? bookingData.page - 1 : 0}
          pageSize={bookingData?.pageSize ?? 10}
        />
      </CardContent>
    </Card>
  );
}
