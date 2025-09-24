import { Sparkles, CalendarCheck } from "lucide-react";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function BusinessProcess() {
  return (
    <section className="w-full bg-black py-32 px-11 relative">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-light" />
          <span className="text-2xl text-purple-light tracking-widest">
            HOW IT WORKS
          </span>
        </div>
        <div>
          <span className="text-3xl font-extrabold text-slate-200">
            OUR BUSINESS PROCESS
          </span>
        </div>
      </div>

      {/* Row 1 */}
      <div className="relative grid grid-cols-3 gap-8 py-20">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              1
            </span>
          </div>
          <span className="mt-4 text-[16px] font-medium text-white">
            Schedule an Appointment
          </span>
          <span className="mt-2 text-[13px] text-sub-text">
            The first step in getting your car repaired at AutoWorks is to
            schedule an appointment.
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center relative">
          {/* Line Step1 -> Step2 */}
          <div className="absolute left-[-25%] top-[48px] w-1/2 flex items-center">
            <div className="flex-1 border-t-2 border-dashed border-white relative">
              <MdKeyboardArrowRight className="absolute bg-transparent -right-3 top-1/2 translate-x-1 z-50 -translate-y-3.25 w-6 h-6 text-white " />
            </div>
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              2
            </span>
          </div>
          <span className="mt-4 text-[16px] font-medium text-white">
            Diagnostic and Inspection
          </span>
          <span className="mt-2 text-[13px] text-sub-text">
            Our technicians will perform a comprehensive diagnostic.
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center relative">
          {/* Line Step2 -> Step3 */}
          <div className="absolute left-[-25%] top-[48px] w-1/2 flex items-center">
            <div className="flex-1 border-t-2 border-dashed border-white relative">
              <MdKeyboardArrowRight className="absolute bg-transparent -right-3 top-1/2 translate-x-1 z-50 -translate-y-3.25 w-6 h-6 text-white " />
            </div>
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              3
            </span>
          </div>
          <span className="mt-4 text-[16px] font-medium text-white">
            Repair Work
          </span>
          <span className="mt-2 text-[13px] text-sub-text">
            We will keep you informed of the progress.
          </span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-8 mt-12 relative">
        {/* Step 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              4
            </span>
          </div>
          <span className="mt-4 text-[16px] font-medium text-white">
            Quality Assurance
          </span>
          <span className="mt-2 text-[13px] text-sub-text">
            We take great pride in the quality of our work.
          </span>
        </div>

        {/* Step 5 */}
        <div className="flex flex-col items-center text-center relative">
          {/* Line Step4 -> Step5 */}
          <div className="absolute left-[-25%] top-[48px] w-1/2 flex items-center">
            <div className="flex-1 border-t-2 border-dashed border-white relative">
              <MdKeyboardArrowRight className="absolute bg-transparent -right-3 top-1/2 translate-x-1 z-50 -translate-y-3.25 w-6 h-6 text-white " />
            </div>
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-5 -right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              5
            </span>
          </div>
          <span className="mt-4 text-[16px] font-medium text-white">
            Payment and pick-up
          </span>
          <span className="mt-2 text-[13px] text-sub-text">
            We accept various forms of payment.
          </span>
        </div>
      </div>
    </section>
  );
}
