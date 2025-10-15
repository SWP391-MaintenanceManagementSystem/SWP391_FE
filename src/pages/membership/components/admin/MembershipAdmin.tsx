import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import MembershipAdminTable from "./table/MembershipAdminTable";


export default function MembershipAdmin() {
  return (
    <div>
        <DynamicBreadcrumbs pathTitles={{ membership: "Memberships" }} />
        <MainContentLayout>
          <MembershipAdminTable />
        </MainContentLayout>

    </div>
  )
}
