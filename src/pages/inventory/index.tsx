import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import StatisticsSection from "./components/StatisticsSection";

export default function InventoryManagement() {
  return (
    <div>
      <DynamicBreadcrumbs pathTitles={{ inventory: "Inventory Management" }} />
      <MainContentLayout className="grid grid-cols-1 md:grid-rows-[auto, 1fr]">
        <StatisticsSection />
      </MainContentLayout>
    </div>
  );
}
