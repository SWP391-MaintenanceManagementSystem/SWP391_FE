import { useState } from "react";
import ViewDetailShift from "../../shifts/ViewDetailShift";
import { ViewDetailDialog } from "@/components/dialog/ViewDetailDialog";
import type { Shift } from "@/types/models/shift";
import { Badge } from "@/components/ui/badge";
export const ShiftCell = ({ shift }: { shift: Shift }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Badge variant="outline">
      <button onClick={() => setIsOpen(true)}>{shift.name}</button>
      {isOpen && (
        <ViewDetailDialog
          open={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          title="Shift Information"
        >
          <ViewDetailShift item={shift} />
        </ViewDetailDialog>
      )}
    </Badge>
  );
};
