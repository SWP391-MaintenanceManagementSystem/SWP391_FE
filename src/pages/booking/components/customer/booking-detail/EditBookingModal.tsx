import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import VehicleSelector from "../VehicleSelector";
import ServiceCenterSelector from "../ServiceCenterSelector";
import DateTimeSelector from "../DateTimeSelector";
import ServicesSelector from "../ServicesSelector";
import NoteField from "../NoteField";
import { ScrollArea } from "@/components/ui/scroll-area";
import useVehicles from "@/services/vehicle/hooks/useVehicles";
import useCenters from "@/services/center/hooks/useCenters";
import PackagesSelector from "../PackagesSelector";
import { useEditBookingForm } from "@/services/booking/hooks/useEditBookingForm";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";
import { Loader2 } from "lucide-react";

export default function EditBookingModal({
  open,
  onClose,
  booking,
}: {
  open: boolean;
  onClose: () => void;
  booking: CustomerBookingDetails;
}) {
  const { data: vehicles = [] } = useVehicles();
  const { data: centers = [] } = useCenters();
  const { form, onSubmit, isPending } = useEditBookingForm(booking);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.handleSubmit(async (data) => {
      await onSubmit(data, "CUSTOMER");
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
            <VehicleSelector form={form} vehicles={vehicles} disabled />
            <ServiceCenterSelector form={form} centers={centers} disabled />
            <DateTimeSelector control={form.control} />
            <ServicesSelector
              form={form}
              initialServices={booking.bookingDetails.services}
            />
            <PackagesSelector
              form={form}
              initialPackages={booking.bookingDetails.packages}
            />
            <NoteField form={form} />
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
            disabled={isPending || !form.formState.isDirty}
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
