import {
  Sparkles,
  CalendarCheck,
  ShieldAlert,
  Wrench,
  ShieldHalf,
  CreditCard,
} from "lucide-react";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function BusinessProcess() {
  return (
    <section className="w-full bg-black py-16 sm:py-24 px-6 sm:px-11 relative dark:bg-white">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-light dark:text-purple-landing-dark" />
          <span className="text-xl sm:text-2xl text-purple-light tracking-widest dark:text-purple-landing-dark">
            HOW IT WORKS
          </span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-200 dark:text-black">
            OUR BUSINESS PROCESS
          </span>
        </div>
      </div>

      {/* Row 1 */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12 sm:py-20">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-amber-primary" />
            </div>
            <span className="absolute -top-4 -right-2 bg-white text-black dark:bg-black dark:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
              1
            </span>
          </div>
          <span className="mt-4 text-base sm:text-[16px] font-medium text-white dark:text-black">
            Schedule an Appointment
          </span>
          <span className="mt-2 text-sm text-sub-text dark:text-gray-600">
            The first step in getting your car repaired at AutoWorks is to
            schedule an appointment.
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center relative">
          {/* Line Step1 -> Step2 */}
          <div className="hidden lg:flex absolute left-[-25%] top-[40px] w-1/2 items-center">
            <div className="flex-1 border-t-2 border-dashed border-white dark:border-black relative">
              <MdKeyboardArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white dark:text-black" />
            </div>
          </div>

          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-amber-primary" />
            </div>
            <span className="absolute -top-4 -right-2 bg-white text-black dark:bg-black dark:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
              2
            </span>
          </div>
          <span className="mt-4 text-base sm:text-[16px] font-medium text-white dark:text-black">
            Diagnostic and Inspection
          </span>
          <span className="mt-2 text-sm text-sub-text dark:text-gray-600">
            Our technicians will perform a comprehensive diagnostic.
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center relative">
          {/* Line Step2 -> Step3 */}
          <div className="hidden lg:flex absolute left-[-25%] top-[40px] w-1/2 items-center">
            <div className="flex-1 border-t-2 border-dashed border-white dark:border-black relative">
              <MdKeyboardArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white dark:text-black" />
            </div>
          </div>

          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-primary flex items-center justify-center">
              <Wrench className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-amber-primary" />
            </div>
            <span className="absolute -top-4 -right-2 bg-white text-black dark:bg-black dark:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
              3
            </span>
          </div>
          <span className="mt-4 text-base sm:text-[16px] font-medium text-white dark:text-black">
            Repair Work
          </span>
          <span className="mt-2 text-sm text-sub-text dark:text-gray-600">
            We will keep you informed of the progress.
          </span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 sm:mt-12 relative">
        {/* Step 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-primary flex items-center justify-center dark:bg-purpl">
              <ShieldHalf className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-amber-primary" />
            </div>
            <span className="absolute -top-4 -right-2 bg-white text-black dark:bg-black dark:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
              4
            </span>
          </div>
          <span className="mt-4 text-base sm:text-[16px] font-medium text-white dark:text-black">
            Quality Assurance
          </span>
          <span className="mt-2 text-sm text-sub-text dark:text-gray-600">
            We take great pride in the quality of our work.
          </span>
        </div>

        {/* Step 5 */}
        <div className="flex flex-col items-center text-center relative">
          {/* Line Step4 -> Step5 */}
          <div className="hidden sm:flex absolute left-[-25%] top-[40px] w-1/2 items-center">
            <div className="flex-1 border-t-2 border-dashed border-white dark:border-black relative">
              <MdKeyboardArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white dark:text-black" />
            </div>
          </div>

          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-primary flex items-center justify-center ">
              <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-amber-primary" />
            </div>
            <span className="absolute -top-4 -right-2 bg-white text-black dark:bg-black dark:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
              5
            </span>
          </div>
          <span className="mt-4 text-base sm:text-[16px] font-medium text-white dark:text-black">
            Payment and pick-up
          </span>
          <span className="mt-2 text-sm text-sub-text dark:text-gray-600">
            We accept various forms of payment.
          </span>
        </div>
      </div>
    </section>
  );
}
