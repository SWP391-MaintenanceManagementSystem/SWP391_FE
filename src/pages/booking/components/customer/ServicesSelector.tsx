import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import MultiSelector from "../MultiSelector";
import { type CreateBookingFormValues } from "../../lib/schema";
import useSearchServices from "@/services/service/hooks/useSearchServices";
import { ServiceDetailDialog } from "./ServiceDetailDialog";
import type { Service } from "@/types/models/service";

export default function ServicesSelector({
  form,
}: {
  form: UseFormReturn<CreateBookingFormValues>;
}) {
  const [selectedItem, setSelectedItem] = useState<Service | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleOpenDetail = (item: Service) => {
    setSelectedItem(item);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
    setTimeout(() => setSelectedItem(null), 150);
  };

  return (
    <>
      <MultiSelector<Service>
        form={form}
        fieldName="serviceIds"
        label="Services"
        placeholder="Search services..."
        useSearchHook={useSearchServices}
        onOpenDetailModal={handleOpenDetail}
      />

      <ServiceDetailDialog
        isOpen={detailOpen}
        onClose={handleCloseDetail}
        service={selectedItem}
      />
    </>
  );
}
