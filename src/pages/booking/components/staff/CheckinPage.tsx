import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";

export default function CheckinPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const decodedBookingId = bookingId ? b64DecodeUnicode(bookingId) : null;

  return (
    <div>
      <DynamicBreadcrumbs
        pathTitles={{
          booking: "Booking Management",
          [bookingId ?? ""]: "Check-In Detail",
        }}
        ignorePaths={["checkin"]}
      />
    </div>
  );
}
