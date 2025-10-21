import { type UseFormReturn } from "react-hook-form";
import MultiSelector from "../MultiSelector";
import { type CreateBookingFormValues } from "../../lib/schema";
import { PackageDetailDialog } from "./PackageDetailDialog";
import type { Package } from "@/types/models/package";
import { useState } from "react";
import useSearchPackage from "@/services/package/hooks/useSearchPackages";
export default function PackagesSelector({
  form,
}: {
  form: UseFormReturn<CreateBookingFormValues>;
}) {
  const [selectedItem, setSelectedItem] = useState<Package | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleOpenDetail = (item: Package) => {
    setSelectedItem(item);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
    setTimeout(() => setSelectedItem(null), 150);
  };

  return (
    <>
      <MultiSelector<Package>
        form={form}
        fieldName="packageIds"
        label="Packages"
        useSearchHook={useSearchPackage}
        placeholder="Type to search packages... (or select services above)"
        hint="Optional - select services OR packages"
        onOpenDetailModal={handleOpenDetail}
      />
      <PackageDetailDialog
        isOpen={detailOpen}
        onClose={handleCloseDetail}
        packageItem={selectedItem}
      />
    </>
  );
}
