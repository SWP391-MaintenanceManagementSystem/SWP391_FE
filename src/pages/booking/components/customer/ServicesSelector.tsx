import { useState } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import MultiSelector from "../MultiSelector";
import useSearchServices from "@/services/service/hooks/useSearchServices";
import { ServiceDetailDialog } from "./ServiceDetailDialog";
import type { Service } from "@/types/models/service";

interface ServiceSelectorProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  initialServices?: Array<{ id: string; name: string }>;
  disabled?: boolean;
}

export default function ServicesSelector<T extends FieldValues>({
  form,
  initialServices,
  disabled,
}: ServiceSelectorProps<T>) {
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
      <MultiSelector<Service, T>
        form={form}
        fieldName="serviceIds"
        label="Services"
        placeholder="Type to search services..."
        useSearchHook={useSearchServices}
        onOpenDetailModal={handleOpenDetail}
        initialItems={initialServices}
        disabled={disabled}
      />

      <ServiceDetailDialog
        isOpen={detailOpen}
        onClose={handleCloseDetail}
        service={selectedItem}
      />
    </>
  );
}
