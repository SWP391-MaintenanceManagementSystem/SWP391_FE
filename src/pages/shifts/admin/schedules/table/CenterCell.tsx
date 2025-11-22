import { useState } from "react";
import ViewDetailCenter from "../ViewDetailCenter";
import { ViewDetailDialog } from "@/components/dialog/ViewDetailDialog";
import type { ServiceCenter } from "@/types/models/center";
import { Badge } from "@/components/ui/badge";
export const CenterCell = ({ center }: { center: ServiceCenter }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Badge variant="outline">
      <button onClick={() => setIsOpen(true)}>{center.name}</button>
      {isOpen && (
        <ViewDetailDialog
          open={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          title="Service Center Information"
        >
          <ViewDetailCenter item={center} />
        </ViewDetailDialog>
      )}
    </Badge>
  );
};
