import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";

export default function InventoryManagement() {
  return (
    <div>
      <DynamicBreadcrumbs />
      <MainContentLayout>
        <h3>Inventory Management</h3>
      </MainContentLayout>
    </div>
  );
}
