import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import { useGetCustomerById } from "@/services/manager/queries";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import Loading from "@/components/Loading";

export default function ViewDetailInfo() {
  const { id } = useParams<{ id: string }>();
  const customerId = id ? b64DecodeUnicode(id) : null;
  const { data: customer } = useGetCustomerById(customerId ?? "");

  if (!customer) return <Loading />;
  return (
    <div className="w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs
        pathTitles={{
          vehicles: "Customer & Vehicles Management",
          [id ?? ""]: "Detailed Information",
        }}
      />
      <MainContentLayout>{customer.email}</MainContentLayout>
    </div>
  );
}
