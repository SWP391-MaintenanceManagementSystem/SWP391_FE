import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import StatisticsSection from "./components/StatisticsSection";
import ItemsListSection from "./components/ItemsListSection";

export default function AdminInventoryManagement() {
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ inventory: "Inventory Management" }} />
      <MainContentLayout className="flex flex-col md:gap-8 gap-6 pt-4 overflow-y-auto">
        <StatisticsSection />
        <ItemsListSection />
      </MainContentLayout>
    </div>
  );
}
