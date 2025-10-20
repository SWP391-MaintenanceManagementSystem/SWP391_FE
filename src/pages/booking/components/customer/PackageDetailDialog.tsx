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
import type { Package } from "@/types/models/package";

interface PackageDetailDialogProps {
  packageItem: Package | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PackageDetailDialog({
  packageItem,
  isOpen,
  onClose,
}: PackageDetailDialogProps) {
  
  if (!packageItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] font-inter">
        <DialogHeader>
          <DialogTitle>{packageItem.name}</DialogTitle>
          <DialogDescription>
            Detailed information and pricing for this package.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="col-span-1 text-sm font-medium text-gray-500">
              Description:
            </p>
            <p className="col-span-3 text-sm">{packageItem.description}</p>
          </div>

          <Separator className="my-2" />

          {/* Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="col-span-1 text-base font-medium text-gray-500">
              Price:
            </p>
            <p className="col-span-3 text-lg font-bold text-green-600">
              {packageItem.price}
            </p>
          </div>

          <Separator className="my-2" />

          {/* Included Services */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">Included Services:</h4>
            {packageItem.services.length > 0 ? (
              <ul className="list-disc pl-5 text-sm">
                {packageItem.services.map((s, index) => (
                  <li key={index}>
                    {s.name} {s.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-gray-500">
                No services included in this package.
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
