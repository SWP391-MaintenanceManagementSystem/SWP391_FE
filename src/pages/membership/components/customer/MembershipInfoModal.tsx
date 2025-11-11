import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Membership } from "@/types/models/membership";

interface MembershipInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  membership: Membership | null;
}

export default function MembershipInfoModal({
  open,
  onOpenChange,
  membership,
}: MembershipInfoModalProps) {
  if (!membership) return null;

  const formatPeriodType = (type: string) => {
    switch (type) {
      case "DAY":
        return "Day";
      case "WEEK":
        return "Week";
      case "MONTH":
        return "Month";
      case "YEAR":
        return "Year";
      default:
        return type;
    }
  };

  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 border-b">
          <DialogTitle className="text-lg font-semibold font-inter">
            {membership.name}
          </DialogTitle>
        </DialogHeader>

        {/* Content scrollable */}
        <div className=" overflow-y-auto px-6 py-4 space-y-2 text-sm text-gray-700 dark:text-white font-inter">
          <p>
            <strong>Price:</strong> ${membership.price.toLocaleString()}
          </p>
          <p>
            <strong>Duration:</strong> {membership.duration}{" "}
            {formatPeriodType(membership.periodType)}
          </p>
         

          <p>
            <p>
              <strong>Description:</strong> {membership.description || "N/A"}
            </p>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
