import { Sparkles } from "lucide-react";
import { CalendarCheck } from "lucide-react";
export default function BusinessProcess() {
  return (
    <section className="w-full bg-black py-32 px-11">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-light" />
          <span className="text-2xl text-purple-light tracking-widest ">
            HOW IT WORKS
          </span>
        </div>
        <div>
          <span className="text-3xl font-extrabold text-state-200">
            OUR BUSINESS PROCESS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 py-20">
        {/* step1 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              1
            </span>
          </div>
          <span className=" mt-4 text-[16px] font-medium text-white">
            Schedule an Appointment
          </span>
          <span className="mt-2 text-[13px]  text-sub-text">
            The first step in getting your car repaired at AutoWorks is to
            schedule an appointment. You can do this by phone, online, or by
            visiting our shop in person.
          </span>
        </div>
        

        {/* step2 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              2
            </span>
          </div>
          <span className=" mt-4 text-[16px] font-medium text-white">
            Diagnostic and Inspection
          </span>
          <span className="mt-2 text-[13px]  text-sub-text">
            When you bring your car in for repairs, our technicians will perform
            a comprehensive diagnostic and inspection to determine the root
            cause of any issues.
          </span>
        </div>

        {/* step3 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              3
            </span>
          </div>
          <span className=" mt-4 text-[16px] font-medium text-white">
            Repair Work
          </span>
          <span className="mt-2 text-[13px]  text-sub-text">
            We will keep you informed of the progress of your repairs and let
            you know if any additional work is needed.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-12">
        {/* step4 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              4
            </span>
          </div>
          <span className=" mt-4 text-[16px] font-medium text-white">
            Quality Assurance
          </span>
          <span className="mt-2 text-[13px]  text-sub-text">
            We take great pride in the quality of our work and want to ensure
            that you are completely satisfied with the repairs we have done.
          </span>
        </div>

        {/* step5 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              5
            </span>
          </div>
          <span className=" mt-4 text-[16px] font-medium text-white">
            Payment and pick-up
          </span>
          <span className="mt-2 text-[13px]  text-sub-text">
            We accept various forms of payment, including credit cards and cash,
            and can also work with your insurance company if your repairs are
            covered under your policy.
          </span>
        </div>
      </div>
    </section>
  );
}
