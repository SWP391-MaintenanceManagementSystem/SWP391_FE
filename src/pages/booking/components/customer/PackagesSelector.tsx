import { type FieldValues, type UseFormReturn } from "react-hook-form";
import MultiSelector from "../MultiSelector";
import { PackageDetailDialog } from "./PackageDetailDialog";
import type { Package } from "@/types/models/package";
import { useState } from "react";
import useSearchPackage from "@/services/package/hooks/useSearchPackages";

interface PackageSelectorProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  initialPackages?: Array<{ id: string; name: string }>;
}

export default function PackagesSelector<T extends FieldValues>({
  form,
  initialPackages,
}: PackageSelectorProps<T>) {
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
      <MultiSelector<Package, T>
        form={form}
        fieldName="packageIds"
        label="Packages"
        useSearchHook={useSearchPackage}
        placeholder="Type to search packages... (or select services above)"
        hint="Optional - select services OR packages"
        onOpenDetailModal={handleOpenDetail}
        initialItems={initialPackages}
      />
      <PackageDetailDialog
        isOpen={detailOpen}
        onClose={handleCloseDetail}
        packageItem={selectedItem}
      />
    </>
  );
}
