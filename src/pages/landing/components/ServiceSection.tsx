import { Sparkles, ArrowUpRight } from "lucide-react";
import repair from "@/assets/repair.png";
import maintanance from "@/assets/maintanance.png";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, ShieldCheck, Wrench } from "lucide-react";
export default function ServiceSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 md:py-32">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="flex flex-row items-center ">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-primary" />
          <span className="text-base sm:text-lg md:text-2xl text-purple-primary tracking-widest">
            WHAT WE OFFER
          </span>
        </div>
        <span className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold  leading-snug">EXPLORE OUR SERVICES</span>
      </div>
      <div className="grid md:grid-cols-2 gap-12 mt-14 px-11">
        <div className="relative group overflow-hidden ">
          <img
            src={repair}
            alt="Repair Services"
            className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-center px-12 text-white">
            <h3 className="text-2xl font-bold mb-4">Repair Services</h3>
            <Button className="!bg-purple-primary !px-3 !py-3.5 !w-[115px] h-14">
              Explore <ArrowUpRight />
            </Button>
          </div>
        </div>
        <div className="relative group overflow-hidden">
          <img
            src={maintanance}
            alt="Maintenance Services"
            className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-4">Maintenance Services</h3>
            <Button className="!bg-purple-primary !px-6 !py-[18px] !w-[115px] h-14">
              Explore <ArrowUpRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center">
        <span className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold  leading-snug">Why choose Us?</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-primary tracking-widest">
            We are here for whatever you need
          </span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 text-left py-11 px-11 ">
        {/* Item 1 */}
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center rounded-full px-3.5 py-3.5 bg-purple-primary">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-primary">
              Competitive pricing
            </h3>
            <p className="text-primary-gray">
              We understand that auto repair can be expensive, which is why we
              offer competitive pricing for all of our services. We strive to
              provide affordable solutions without sacrificing quality.
            </p>
          </div>
        </div>
        {/* Item 2 */}
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center rounded-full px-3.5 py-3.5 bg-purple-primary">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-primary">
              Fast and efficient service
            </h3>
            <p className="text-primary-gray">
              We know that your time is valuable, which is why we work quickly
              and efficiently to get your car back on the road as soon as
              possible. Our team is dedicated to completing your repairs in a
              timely manner without compromising quality.
            </p>
          </div>
        </div>
        {/* Item 3 */}
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center rounded-full px-3.5 py-3.5 bg-purple-primary">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-primary">
              Experienced and certified technicians
            </h3>
            <p className="text-primary-gray">
              Our team of technicians is highly trained and experienced in all
              aspects of auto repair. We only hire certified professionals who
              have a proven track record of delivering high-quality work.
            </p>
          </div>
        </div>
        {/* Item 4 */}
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center rounded-full px-3.5 py-3.5 bg-purple-primary">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-primary">
              Use of high-quality parts and equipment
            </h3>
            <p className="text-primary-gray">
              We only use the highest quality parts and equipment for all of our
              repairs. We believe that using top-of-the-line components helps to
              ensure the longevity and reliability of your vehicle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
