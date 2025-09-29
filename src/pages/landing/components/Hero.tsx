import hero from "@/assets/hero.png";
import rating from "@/assets/rating.png";
import contract from "@/assets/contract.png";
import pay from "@/assets/pay.png";

export default function Hero() {
  return (
    <section className="w-full py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Title + Hero Image */}
      <div className="relative flex flex-col items-center justify-center my-16 md:my-24">
        <div className="flex flex-col items-center text-center leading-none">
          <span className="text-5xl md:text-9xl lg:text-[200px] font-bold">
            SMOOTH
          </span>
          <span className="text-5xl md:text-9xl lg:text-[200px] font-bold text-purple-landing">
            SERVICE
          </span>
        </div>
        <img
          src={hero}
          alt="Hero car service"
          className="absolute top-1/2 -translate-y-1/2 scale-25  md:scale-40 lg:scale-80"
        />
      </div>

      {/* Feature list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full  mx-auto px-4">
        {/* Feature 1 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-x-4">
          <img
            src={pay}
            alt="Best Prices"
            className="w-10 h-10 sm:w-14 sm:h-14 mb-3 sm:mb-0"
          />
          <div className="flex flex-col">
            <span className="text-purple-primary font-bold text-base sm:text-lg md:text-xl">
              BEST PRICES
            </span>
            <span className="text-xs sm:text-sm md:text-base text-sub-text leading-relaxed">
              The prices for all mechanical services and repairs are reasonable.
            </span>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-x-4">
          <img
            src={rating}
            alt="Guarantee"
            className="w-10 h-10 sm:w-14 sm:h-14 mb-3 sm:mb-0"
          />
          <div className="flex flex-col">
            <span className="text-purple-primary font-bold text-base sm:text-lg md:text-xl">
              100% GUARANTEE
            </span>
            <span className="text-xs sm:text-sm md:text-base text-sub-text leading-relaxed">
              All of our repairs and services come with a guarantee period.
            </span>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-x-4">
          <img
            src={contract}
            alt="Certified Mechanics"
            className="w-10 h-10 sm:w-14 sm:h-14 mb-3 sm:mb-0"
          />
          <div className="flex flex-col">
            <span className="text-purple-primary font-bold text-base sm:text-lg md:text-xl">
              CERTIFIED MECHANICS
            </span>
            <span className="text-xs sm:text-sm md:text-base text-sub-text leading-relaxed">
              All of our mechanics are qualified and are regularly trained.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
