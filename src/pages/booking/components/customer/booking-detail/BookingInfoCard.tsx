import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingInfoCardProps {
  id?: string;
  bookingDate?: string | Date;
  status?: string;
  note?: string;
}

export default function BookingInfoCard({
  id,
  bookingDate,
  status,
  note,
}: BookingInfoCardProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Booking Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>ID:</strong> {id || "N/A"}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(bookingDate || "").toLocaleString() || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {status || "N/A"}
        </p>
        <p>
          <strong>Note:</strong> {note || "N/A"}
        </p>
      </CardContent>
    </Card>
  );
}
