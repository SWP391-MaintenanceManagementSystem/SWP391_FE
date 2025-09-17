import hero from "@/assets/hero.png";
import rating from "@/assets/rating.png";
import contract from "@/assets/contract.png";
import pay from "@/assets/pay.png";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-24">
        <div className="flex flex-col relative">
          <span className="text-[200px] font-bold">SMOOTH</span>
          <span className="text-[200px] font-bold text-purple-landing">
            SERVICE
          </span>
        </div>
        <img src={hero} className="absolute scale-85" />
      </div>
      <div className="flex items-center justify-around gap-x-8 w-full">
        <div className="flex items-center gap-x-5">
          <img src={pay} />
          <div className="flex flex-col w-[348px] ">
            <span className="text-purple-primary font-bold text-2xl ">
              BEST PRICES
            </span>
            <span className="text-xl text-sub-text leading-5.5">
              The prices for all mechanical services and repairs are reasonable.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-5 ">
          <img src={rating} />
          <div className="flex flex-col w-[348px] ">
            <span className="text-purple-primary font-bold text-2xl ">
              100% GUARANTEE
            </span>
            <span className="text-xl text-sub-text leading-5.5">
              All of our repairs and services come with a guarantee period.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-5">
          <img src={contract} />
          <div className="flex flex-col w-[348px] ">
            <span className="text-purple-primary font-bold text-2xl ">
              CERTIFIED MECHANICS
            </span>
            <span className="text-xl text-sub-text leading-5.5">
              All of our mechanics are qualified and are regularly trained.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
