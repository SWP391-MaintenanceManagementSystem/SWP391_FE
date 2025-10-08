import aboutLeft from "@/assets/aboutLeft.png";
import aboutRight from "@/assets/aboutRight.png";
import { Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-24 md:py-32 dark:bg-neutral-50">
      <div className="w-full px-[44px]">
        {/* Heading */}
        <div className="text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 sm:w-5 sm:h-5 text-purple-light dark:text-purple-landing" />
            <span className="text-base sm:text-lg md:text-2xl text-purple-light tracking-widest dark:text-purple-landing">
              WHO WE ARE
            </span>
          </div>

          <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-50 leading-snug dark:text-gray-900">
            PREMIUM TIRE REPAIR AND AUTO MAINTENANCE
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 sm:mt-14 items-stretch">
          {/* Left image */}
          <div className="h-full">
            <img
              src={aboutLeft}
              alt="About left"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Text + Right image */}
          <div className="flex flex-col justify-between h-full">
            <p className="text-sm sm:text-base md:text-lg text-sub-text leading-relaxed dark:text-gray-700">
              Our skilled technicians are equipped with the latest tools and
              expertise to diagnose and fix any automotive issue. We take pride
              in our work, delivering results that exceed your expectations.
            </p>
            <img
              src={aboutRight}
              alt="About right"
              className="w-full h-auto object-cover mt-6 rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
