import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Service {
  name: string;
  description: string;
  finalPrice: number;
  parts: string[];
}

interface ServiceDetailDialogProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceDetailDialog({
  service,
  isOpen,
  onClose,
}: ServiceDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{service.name}</DialogTitle>
          <DialogDescription>
            Detailed information and pricing for this service.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="col-span-1 text-sm font-medium text-gray-500">
              Description:
            </p>
            <p className="col-span-3 text-sm">{service.description}</p>
          </div>

          <Separator className="my-2" />

          <div className="grid grid-cols-4 items-center gap-4">
            <p className="col-span-1 text-base font-medium text-gray-500">
              Price:
            </p>
            <p className="col-span-3 text-lg font-bold text-green-600">
              {service.finalPrice}
            </p>
          </div>

          <Separator className="my-2" />

          <div>
            <h4 className="mb-2 text-sm font-semibold">Included Parts:</h4>
            {service.parts.length > 0 ? (
              <ul className="list-disc pl-5 text-sm">
                {service.parts.map((part, index) => (
                  <li key={index}>{part}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-gray-500">
                No parts are included with this service.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
