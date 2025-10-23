import { useParams, useLocation } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";

export default function ViewBookingDetail() {
  const { id } = useParams<{ id: string }>();
  const bookingId = id ? b64DecodeUnicode(id) : null;

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          booking: "Booking Management",
          [id ?? ""]: "Detailed Information",
        }}
      />
      <MainContentLayout>
        <h1>{bookingId}</h1>
      </MainContentLayout>
    </div>
  );
}
