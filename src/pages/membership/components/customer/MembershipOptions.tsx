import Slider, { type Settings } from "react-slick";
import MembershipCard from "./MembershipCard";
import Loading from "@/components/Loading";
import { useMembership } from "@/services/membership/hooks/useMembership";
import { usePayment } from "@/services/payment/hooks/usePayment";
import { ReferenceType } from "@/types/enums/referenceType";

export default function MembershipOptions() {
  const { data, isLoading } = useMembership();
  const { paymentMutation } = usePayment();

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

  return (
    <div className="w-full">
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
                paymentMutation.mutate({
                  referenceId: m.id,
                  amount: m.price,
                  referenceType: ReferenceType.MEMBERSHIP,
                })
              }
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
