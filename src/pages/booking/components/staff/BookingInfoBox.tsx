import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import "animate.css";
import { Car, Hotel, User } from "lucide-react";
import BookingTag from "@/components/tag/BookingTag";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingServicesDialog } from "../customer/booking-detail/BookingServicesDialog";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";

type BookingInfoBoxProps = {
  booking: CustomerBookingDetails;
};

const BookingInfoBox = ({ booking: bookingDetail }: BookingInfoBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="w-full bg-purple-50 border-purple-200 dark:bg-purple-primary-dark dark:text-amber-primary dark:border-purple-800 max-w-sm md:max-w-xs lg:max-w-[368px] h-full min-w-[340px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-amber-primary flex items-center gap-2">
          Booking Details
        </CardTitle>
        <p>
          <span className="font-mono font-semibold text-gray-800 dark:text-amber-primary text-xs">
            ID: {bookingDetail?.id || "N/A"}
          </span>
        </p>
        <p>
          <span className="font-mono font-semibold text-gray-800 dark:text-amber-primary text-xs">
            Booking Date:{" "}
            {dayjs(bookingDetail?.bookingDate).format("HH:mm DD MMM YYYY") ||
              "N/A"}
          </span>
        </p>
        <p className="font-mono font-semibold text-gray-800 dark:text-amber-primary text-xs">
          <strong>Total Cost:</strong> $
          {Number(bookingDetail?.totalCost).toLocaleString("en-US") ||
            "No cost information available."}
        </p>
        <p>
          <span className="font-mono font-semibold text-gray-800 dark:text-amber-primary text-xs">
            Status:
          </span>{" "}
          {bookingDetail?.status && (
            <BookingTag status={bookingDetail.status} />
          )}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center font-semibold text-xl">
            <User size={20} />
            Customer
          </div>
          <p>
            <span className="font-bold text-gray-800 dark:text-amber-primary text-sm">
              Name:{" "}
            </span>
            {bookingDetail?.customer.firstName}{" "}
            {bookingDetail?.customer.lastName}
          </p>
          <p>
            <span className="font-bold text-gray-800 dark:text-amber-primary text-sm">
              Email:{" "}
            </span>
            {bookingDetail?.customer.email}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center font-semibold text-xl">
            <Car size={20} />
            Vehicle
          </div>
          <p>
            <span className="font-bold text-gray-800 dark:text-amber-primary text-sm">
              License Plate:{" "}
            </span>
            {bookingDetail?.vehicle.licensePlate}
          </p>
          <p>
            <span className="font-bold text-gray-800 dark:text-amber-primary text-sm">
              Brand:{" "}
            </span>
            {bookingDetail?.vehicle.brand}
          </p>
          <p>
            <span className="font-bold text-gray-800 dark:text-amber-primary text-sm">
              Model:{" "}
            </span>
            {bookingDetail?.vehicle.model}
          </p>
          <p>
            <span className="font-bold text-gray-800 dark:text-amber-primary text-sm">
              Production Year:{" "}
            </span>
            {bookingDetail?.vehicle.productionYear}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center font-semibold text-xl">
            <Hotel size={20} />
            Service Center
          </div>
          <p>
            <span className="font-bold text-gray-800 dark:text-amber-primary text-sm">
              Name:{" "}
            </span>
            {bookingDetail?.serviceCenter.name}
          </p>
          <p>
            <span className="font-bold text-gray-800 dark:text-amber-primary text-sm">
              Address:{" "}
            </span>
            {bookingDetail?.serviceCenter.address}
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="outline"
          className=" bg-purple-primary border-purple-primary hover:bg-transparent  dark:bg-purple-secondary-dark dark:hover:bg-transparent dark:hover:border-purple-secondary-dark dark:hover:text-purple-secondary-dark text-accent"
        >
          View Services
        </Button>
      </CardContent>
      <BookingServicesDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        services={bookingDetail?.bookingDetails.services}
        packages={bookingDetail?.bookingDetails.packages}
      />
    </Card>
  );
};

export default BookingInfoBox;
