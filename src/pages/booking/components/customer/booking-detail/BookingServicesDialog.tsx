import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookingDetailStatus } from "@/types/enums/bookingDetailStatus";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { PackageInfo } from "@/types/models/booking-with-detail";
import BookingTag from "@/components/tag/BookingTag";
import type { BookingStatus } from "@/types/enums/bookingStatus";

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  status?: BookingDetailStatus;
}

interface BookingServicesDialogProps {
  services?: ServiceItem[];
  packages?: PackageInfo[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingServicesDialog({
  services = [],
  packages = [],
  open,
  onOpenChange,
}: BookingServicesDialogProps) {
  const [openPackageId, setOpenPackageId] = useState<string | null>(null);

  const togglePackage = (id: string) => {
    setOpenPackageId(openPackageId === id ? null : id);
  };

  const renderServiceItem = (item: ServiceItem, showStatus = true) => (
    <div
      key={item.id}
      className="flex justify-between items-center p-2 rounded border hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium">{item.name}</span>
        {showStatus && item.status && (
          <BookingTag status={item.status as BookingStatus} />
        )}
      </div>
      <Badge variant="secondary" className="text-sm">
        $ {item.price.toLocaleString("en-US")}
      </Badge>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg font-inter">
        <DialogHeader>
          <DialogTitle className="text-purple-600">
            Booking Services & Packages
          </DialogTitle>
        </DialogHeader>

        {/* Services Section */}
        {services.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Services
            </h3>
            <div className="space-y-2">
              {services.map((s) => renderServiceItem(s, true))}
            </div>
          </div>
        )}

        {/* Divider if both exist */}
        {services.length > 0 && packages.length > 0 && (
          <Separator className="my-1" />
        )}

        {/* Packages Section */}
        {packages.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Packages
            </h3>
            <div className="space-y-2">
              {packages.map((pkg) => (
                <div key={pkg.id} className="border rounded-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => togglePackage(pkg.id)}
                    className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition font-medium"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span>{pkg.name}</span>
                      <BookingTag status={pkg.status as BookingStatus} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-sm">
                        $ {pkg.price.toLocaleString("en-US")}
                      </Badge>
                      {openPackageId === pkg.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>
                  {openPackageId === pkg.id && (
                    <div className="p-2 space-y-2 max-h-48 overflow-auto bg-gray-50 dark:bg-gray-900">
                      {pkg.services?.map((s) => renderServiceItem(s, false))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* When empty */}
        {!services.length && !packages.length && (
          <p className="text-center text-gray-500 italic">
            No services or packages found.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
