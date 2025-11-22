import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import MembershipAdminTable from "./table/MembershipAdminTable";

export default function MembershipAdmin() {
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ membership: "Memberships" }} />
      <MainContentLayout className="grid">
        <MembershipAdminTable />
      </MainContentLayout>
    </div>
  );
}
