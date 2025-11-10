import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CheckInForm from "./CheckInForm"; 
import type { VehicleHandover } from "@/types/models/vehicle-handover";

interface CheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handover: VehicleHandover; 
}

export default function CheckInModal({ open, onOpenChange, handover }: CheckInModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 border-b">
          <DialogTitle className="text-lg font-semibold font-inter">
            Vehicle Check-In Form
          </DialogTitle>
        </DialogHeader>

        {/* Content scrollable */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-4">
          <CheckInForm handover={handover} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
