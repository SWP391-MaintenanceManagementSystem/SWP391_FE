import { useParams, useLocation } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import { useGetCustomerById } from "@/services/manager/queries";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import Loading from "@/components/Loading";
import CustomerInfoBox from "./customerManagement/CustomerInfoBox";
import type { CustomerTable } from "./customerManagement/type";
import type { Customer } from "@/types/models/account";

export default function ViewDetailInfo() {
  const { id } = useParams<{ id: string }>();
  const userId = id ? b64DecodeUnicode(id) : null;
  const { data: user } = useGetCustomerById(userId ?? "");

  const customer: CustomerTable = {
    id: user?.id ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    status: user?.status,
    role: user?.role,
    profile: {
      firstName: user?.profile?.firstName ?? "",
      lastName: user?.profile?.lastName ?? "",
      address: (user?.profile as Customer)?.address ?? "",
      isPremium: (user?.profile as Customer)?.isPremium ?? false,
    },
  };

  const location = useLocation() as {
    state?: { currentPage?: number; currentPageSize?: number };
  };

  const currentPage = location.state?.currentPage ?? 1;
  const currentPageSize = location.state?.currentPageSize ?? 10;

  if (!user) return <Loading />;
  return (
    <div className="w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customer & Vehicles Management",
          [id ?? ""]: "Detailed Information",
        }}
      />
      <MainContentLayout className="lg:flex-row flex-col gap-12 ">
        <CustomerInfoBox
          customer={customer}
          currentPage={currentPage}
          currentPageSize={currentPageSize}
        />
      </MainContentLayout>
    </div>
  );
}
