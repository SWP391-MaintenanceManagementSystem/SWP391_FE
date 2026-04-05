import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import IventoryTable from "./components/technician/table/InventoryTable";
import { useTranslation } from "react-i18next";

export default function TechnicianInventoryManagement() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ inventory: t("dashboard.admin.inventory.management_title") }} />
      <MainContentLayout className="flex flex-col md:gap-8 gap-6 pt-4 overflow-y-auto">
        <IventoryTable/>
      </MainContentLayout>
    </div>
  );
}
