import { PeriodType } from "@/types/enums/periodType";
import { Goal, CircleCheck } from "lucide-react";

type MembershipCardProps = {
  title: string;
  description: string;
  price: number;
  duration: number;
  periodType: PeriodType;
  onClick: () => void;
};

export default function MembershipCard({
  title,
  price,
  description,
  duration,
  periodType,
  onClick,
}: MembershipCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // let periodLabel = "";
  let monthlyEquivalent = 0;

  switch (periodType) {
    case PeriodType.DAY:
      // periodLabel = `${duration} day${duration > 1 ? "s" : ""}`;
      monthlyEquivalent = (price / duration) * 30;
      break;
    case PeriodType.MONTH:
      // periodLabel = `${duration} month${duration > 1 ? "s" : ""}`;
      monthlyEquivalent = price / duration;
      break;
    case PeriodType.YEAR:
      // periodLabel = `${duration} year${duration > 1 ? "s" : ""}`;
      monthlyEquivalent = price / (duration * 12);
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // periodLabel = "Unknown period";
      monthlyEquivalent = price;
  }

  const durationText = (() => {
    switch (periodType) {
      case PeriodType.DAY:
        return `Valid for ${duration} day${duration > 1 ? "s" : ""}`;
      case PeriodType.MONTH:
        return `Valid for ${duration} month${duration > 1 ? "s" : ""}`;
      case PeriodType.YEAR:
        return `Valid for ${duration} year${duration > 1 ? "s" : ""}`;
      default:
        return "";
    }
  })();

  const features = [
    durationText,
    "Electric Vehicle Insurance",
    "Accident and Repair Coverage",
  ];

  return (
    <div
      className="
        rounded-2xl p-5 
        bg-gradient-to-br from-purple-500 via-purple-400 to-pink-500
        dark:from-purple-800 dark:to-pink-600
        text-white flex flex-col 
        w-64 h-[360px] font-inter
        transition-transform duration-300 
        hover:scale-105 hover:shadow-xl
      "
    >
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full 
        bg-gradient-to-tr from-purple-400 via-pink-400 to-rose-400 shadow-md"
      >
        <Goal className="w-5 h-5 text-white" />
      </div>

      <h2 className="text-xl font-semibold mt-3 truncate">{title}</h2>
      <p className="text-white/80 text-sm mt-1 line-clamp-2">{description}</p>

      <div className="mt-4">
        <span className="text-2xl font-bold text-white">
          {monthlyEquivalent.toFixed(2)}$
        </span>
        <span className="text-gray-50 text-xs ml-1">/month</span>
      </div>

      <ul className="mt-4 space-y-2 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <CircleCheck className="w-4 h-4 text-white" />
            <span className="text-white/90">{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className="
          mt-4 w-full py-2 rounded-lg font-medium text-sm
          bg-gradient-to-r from-purple-300 to-pink-400
          hover:from-pink-500 hover:to-purple-600
          transition-colors duration-300 shadow-md 
          dark:from-purple-700 dark:to-pink-700
        "
      >
        Buy Now
      </button>
    </div>
  );
}
