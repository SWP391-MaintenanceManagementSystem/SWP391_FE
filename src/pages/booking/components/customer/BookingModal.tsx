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
import { useBookingCreateForm } from "@/services/booking/hooks/useCreateBookingForm";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  initialData?: {
    vehicleId?: string;
    bookingDate?: string;
  };
};

export default function BookingModal({
  open,
  onClose,
  initialData,
}: BookingModalProps) {
  const { data: vehicles = [] } = useVehicles();
  const { data: centers = [] } = useCenters();
  const handleClose = () => {
    form.reset();
    onClose();
  };
  const { form, onSubmit } = useBookingCreateForm(initialData);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.handleSubmit(async (data) => {
      await onSubmit(data);
      handleClose();
    })();
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
          <form id="booking-form" onSubmit={handleSubmit} className="flex flex-col gap-y-3">
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
