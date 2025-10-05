import Slider, { type Settings } from "react-slick";
import MembershipCard from "./MembershipCard";
import Loading from "@/components/Loading";
import { useMembership } from "@/services/membership/hooks/useMembership";

export default function MembershipOptions() {
  const { data, isLoading } = useMembership();

  if (isLoading) return <Loading />;

  const settings: Settings = {
    dots: false,              
    infinite: true,          
    speed: 500,
    slidesToShow: 4,
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
    <div className="w-full ">
      <Slider {...settings}>
        {data?.map((m) => (
          <div key={m.id} className="py-7 px-7"> 
            <MembershipCard
              description={m.description ?? ""}
              title={m.name}
              price={m.price}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
