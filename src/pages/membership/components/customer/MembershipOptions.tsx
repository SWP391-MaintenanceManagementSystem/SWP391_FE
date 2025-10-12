import { useState } from "react";
import Slider, { type Settings } from "react-slick";
import MembershipCard from "./MembershipCard";
import Loading from "@/components/Loading";
import { useMembership } from "@/services/membership/hooks/useMembership";
import { usePayment } from "@/services/payment/hooks/usePayment";
import { ReferenceType } from "@/types/enums/referenceType";
import PurchaseConfirmDialog from "./PurchaseConfirmDialog";

export default function MembershipOptions() {
  const { data, isLoading } = useMembership();
  const { paymentMutation } = usePayment();

  // State quản lý dialog
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

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

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
      <Slider {...settings}>
        {data?.map((m) => (
          <div key={m.id} className="py-5 px-3">
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
      </Slider>

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
