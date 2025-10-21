import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import VehicleSelector from "./VehicleSelector";
import ServiceCenterSelector from "./ServiceCenterSelector";
import DateTimeSelector from "./DateTimeSelector";
import ServicesSelector from "./ServicesSelector";
import NoteField from "./NoteField";
import { ScrollArea } from "@/components/ui/scroll-area";
import useVehicles from "@/services/vehicle/hooks/useVehicles";
import useCenters from "@/services/center/hooks/useCenters";
import PackagesSelector from "./PackagesSelector";
import { useBookingForm } from "@/services/booking/hooks/useBookingForm";
export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: vehicles = [] } = useVehicles();
  const { data: centers = [] } = useCenters();
  const { form, onSubmit } = useBookingForm();

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg w-full font-sans p-0 flex flex-col max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="px-5 py-3">
          <DialogTitle className="text-lg font-semibold">
            Book a Service
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto px-6 text-sm">
          <form
            id="booking-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3"
          >
            <VehicleSelector form={form} vehicles={vehicles} />
            <ServiceCenterSelector form={form} centers={centers} />
            <DateTimeSelector control={form.control} />
            <ServicesSelector form={form} />
            <PackagesSelector form={form} />
            <NoteField form={form} />
          </form>
        </ScrollArea>
        <DialogFooter className="sticky px-5 py-3 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="md:w-1/2 py-2 text-sm w-full"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="booking-form"
            className="md:w-1/2 py-2 text-sm w-full"
          >
            Book Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
