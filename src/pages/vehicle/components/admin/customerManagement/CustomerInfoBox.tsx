import { InfoSection } from "@/pages/profile/components/InfoSection";
import { CircleUserRound, PenLine } from "lucide-react";
import Tag from "@/components/tag/Tag";
import AccountStatusTag from "@/components/tag/AccountStatusTag";
import { Button } from "@/components/ui/button";
import CustomerInfoForm from "./CustomerInfoForm";
import { useState } from "react";
import useCustomer from "@/services/manager/hooks/useCustomer";
import type { CustomerTable } from "../../libs/table-types";

type CustomerInfoBoxProps = {
  customer: CustomerTable;
  currentPage: number;
  currentPageSize: number;
};

const CustomerInfoBox = ({
  customer,
  currentPage,
  currentPageSize,
}: CustomerInfoBoxProps) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { form, handleEditCustomerInfo } = useCustomer(
    customer,
    currentPage,
    currentPageSize,
  );

  return (
    <div className="flex flex-col justify-between gap-4 min-h-[600px] lg:max-w-[300px] items-center font-inter bg-slate-100 px-[40px] py-[34px] rounded-[20px] shadow-md">
      <div className="space-y-4">
        <div className="w-full flex flex-col gap-2 justify-center items-center">
          <CircleUserRound
            strokeWidth={1.4}
            size={160}
            className="  text-gray-primary min-h-[100px] min-w-[100px]"
          />
          <span>
            {customer?.profile?.firstName + " " + customer?.profile?.lastName}
          </span>
          <Tag text={customer.role || ""} />
        </div>
        <InfoSection title="Information">
          <p>
            <strong>First Name: </strong>
            {customer.profile?.firstName || ""}
          </p>
          <p>
            <strong>Last Name: </strong>
            {customer.profile?.lastName || ""}
          </p>
          <p>
            <strong>Email: </strong>
            {customer.email || ""}
          </p>
          <p>
            <strong>Phone: </strong>
            {customer.phone || ""}
          </p>
          <p>
            <strong>Address: </strong>
            {customer.profile?.address || ""}
          </p>
          <p className="font-inter flex flex-row gap-2">
            <strong className="font-inter">Status:</strong>
            <span className="inline-flex">
              {customer.status && <AccountStatusTag status={customer.status} />}
            </span>
          </p>
        </InfoSection>
      </div>
      <Button
        className="!font-inter !bg-purple-primary text-white dark:text-amber-primary hover:scale-105 transition-transform duration-300"
        onClick={() => {
          form.reset({
            firstName: customer.profile?.firstName || "",
            lastName: customer.profile?.lastName || "",
            email: customer.email || "",
            phone: customer.phone || "",
            address: customer.profile?.address || "",
            status: customer.status,
          });
          setOpenEditDialog(true);
        }}
      >
        <PenLine className="mr-2 h-4 w-4" />
        Edit
      </Button>

      <CustomerInfoForm
        open={openEditDialog}
        onOpenChange={(open) => setOpenEditDialog(open)}
        onConfirm={handleEditCustomerInfo}
        form={form}
      />
    </div>
  );
};

export default CustomerInfoBox;
