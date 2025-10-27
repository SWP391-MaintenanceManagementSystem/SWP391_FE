import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookingDetailStatus } from "@/types/enums/bookingDetailStatus";

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  status?: BookingDetailStatus;
}

interface BookingServicesDialogProps {
  services?: ServiceItem[];
  packages?: ServiceItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingServicesDialog({
  services = [],
  packages = [],
  open,
  onOpenChange,
}: BookingServicesDialogProps) {
  const getStatusBadge = (status?: BookingDetailStatus) => {
    if (!status) return null;

    let badgeClass = "";
    let variant: "outline" | "secondary" = "outline";

    switch (status) {
      case BookingDetailStatus.PENDING:
        badgeClass = "border-yellow-500 text-yellow-600";
        variant = "outline";
        break;
      case BookingDetailStatus.IN_PROCESS:
        badgeClass = "border-purple-500 text-purple-600";
        variant = "secondary";
        break;
      case BookingDetailStatus.COMPLETED:
        badgeClass = "border-green-500 text-green-600";
        variant = "outline";
        break;
    }

    return (
      <Badge variant={variant} className={badgeClass}>
        {status}
      </Badge>
    );
  };

  const renderItem = (item: ServiceItem) => (
    <div
      key={item.id}
      className="flex justify-between items-center p-2 rounded border hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium">{item.name}</span>
        {getStatusBadge(item.status)}
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
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Services
            </h3>
            <div className="space-y-2">{services.map(renderItem)}</div>
          </div>
        )}

        {/* Divider if both exist */}
        {services.length > 0 && packages.length > 0 && (
          <Separator className="my-4" />
        )}

        {/* Packages Section */}
        {packages.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Packages
            </h3>
            <div className="space-y-2">{packages.map(renderItem)}</div>
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
