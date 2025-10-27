import { useState } from "react";
import MembershipCard from "./MembershipCard";
import Loading from "@/components/Loading";
import { usePayment } from "@/services/payment/hooks/usePayment";
import { ReferenceType } from "@/types/enums/referenceType";
import PurchaseConfirmDialog from "./PurchaseConfirmDialog";
import useMembership from "@/services/membership/hooks/useMembership";

export default function MembershipOptions() {
  const { data, isLoading } = useMembership();
  const { paymentMutation } = usePayment();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
    duration: number;
    periodType?: string;
    description?: string;
    id?: string;
  } | null>(null);

  if (isLoading) return <Loading />;

  const handleBuyClick = (plan: {
    name: string;
    price: number;
    duration: number;
    periodType?: string;
    description?: string;
    id?: string;
  }) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleConfirmPurchase = () => {
    if (!selectedPlan) return;

    const found = data?.find((m) => m.name === selectedPlan.name);
    if (!found) return;

    paymentMutation.mutate({
      referenceId: found.id,
      amount: selectedPlan.price,
      referenceType: ReferenceType.MEMBERSHIP,
    });
  };

  return (
    <div className="w-full relative">
      {/* Scrollable container */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-3 py-5">
        {data?.map((m) => (
          <div
            key={m.id}
            className="min-w-[280px] snap-start shrink-0"
          >
            <MembershipCard
              description={m.description ?? ""}
              title={m.name}
              price={m.price}
              duration={m.duration}
              periodType={m.periodType}
              onClick={() =>
                handleBuyClick({
                  name: m.name,
                  price: m.price,
                  duration: m.duration,
                  periodType: m.periodType,
                  description: m.description ?? "",
                  id: m.id,
                })
              }
            />
          </div>
        ))}
      </div>

      {/* Dialog */}
      <PurchaseConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmPurchase}
        plan={
          selectedPlan ?? {
            name: "",
            price: 0,
            duration: 0,
            periodType: "DAY",
            description: "",
          }
        }
      />
    </div>
  );
}
