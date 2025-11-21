import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditBookingForm } from "@/services/booking/hooks/useEditBookingForm";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";
import ServicesSelector from "../customer/ServicesSelector";
import PackagesSelector from "../customer/PackagesSelector";
import { Textarea } from "@/components/ui/textarea";

export default function EditBookingModal({
  open,
  onClose,
  booking,
}: {
  open: boolean;
  onClose: () => void;
  booking: CustomerBookingDetails;
}) {
  const { form, onSubmit, isPending } = useEditBookingForm(booking);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.handleSubmit(async (data) => {
      await onSubmit(data, "STAFF");
      handleClose();
    })();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg w-full font-sans p-0 flex flex-col max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="px-5 py-3">
          <DialogTitle className="text-lg font-semibold">
            Edit Booking
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto px-6 text-sm">
          <form
            id="edit-booking-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-3"
          >
            <Label htmlFor="vehicle">Customer Vehicle</Label>
            <Input id="vehicle" readOnly value={booking.vehicle.licensePlate} />
            <Label htmlFor="center">Service Center</Label>
            <Input id="center" readOnly value={booking.serviceCenter.name} />
            <Label htmlFor="date">Date and Time</Label>
            <Input
              id="date"
              readOnly
              value={dayjs(booking.bookingDate).format("DD MMM YYYY - HH:mm")}
            />

            <ServicesSelector
              form={form}
              initialServices={booking.bookingDetails.services}
            />
            <PackagesSelector
              form={form}
              initialPackages={booking.bookingDetails.packages}
            />
            <Label htmlFor="note">CustomerNote</Label>
            <Textarea id="note" readOnly value={booking.note} />
          </form>
        </ScrollArea>
        <DialogFooter className="sticky px-5 py-3 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
            className="md:w-1/2 py-2 text-sm w-full"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-booking-form"
            disabled={isPending}
            className="md:w-1/2 py-2 text-sm w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Booking"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
