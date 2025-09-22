import aboutLeft from "@/assets/aboutLeft.png";
import aboutRight from "@/assets/aboutRight.png";
import { Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="w-full bg-black text-white py-16">
      <div className="container mx-auto">
        <div className="px-11">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-light" />
            <h2 className="text-sm text-purple-light tracking-widest">
              WHO ARE YOU
            </h2>
          </div>

          <h1 className="text-3xl font-bold ">
            Premium Tire Repair and Auto Maintenance
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-14 px-11">
          <img src={aboutLeft} className="rounded-lg" />
          <div className="flex flex-col justify-between h-full">
            <p className=" text-sub-text ">
              Our skilled technicians are equipped with the latest tools and
              expertise to diagnose and fix any automotive issue. We take pride
              in our work, delivering results that exceed your expectations.
            </p>
            <img src={aboutRight} className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
