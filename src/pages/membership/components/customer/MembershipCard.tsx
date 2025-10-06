import { Goal, CircleCheck } from "lucide-react";

type MembershipCardProps = {
  title: string;
  description: string;
  price: number;
  onClick: () => void;
};
const features = ["1 Vehicle", "Basic Support", "Maintenance Reminders"]

export default function MembershipCard({
  title,
  price,
  description,
  onClick
}: MembershipCardProps) {
  return (
    <div
      className="rounded-2xl p-6 overflow-x-auto
      bg-gradient-to-br from-purple-500 via-purple-400 to-pink-500
      dark:from-purple-800 dark:to-pink-600
      text-white flex flex-col w-72 h-[450px] font-inter 
      transition-transform duration-300 hover:scale-105 hover:shadow-md dark:from-purple-200 dark:via-purple-300 dark:to-pink-200  "
    >
      <div
        className="w-14 h-14 flex items-center justify-center rounded-full 
        bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-400 shadow-lg"
      >
        <Goal className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-2xl font-semibold mt-4">{title}</h2>
      <p className="text-white/80 text-sm mt-1">{description}</p>

      <div className="mt-4">
        <span className="text-3xl font-bold text-white">{price}$</span>
        <span className="text-gray-50 text-sm ml-1">/month</span>
      </div>
      <ul className="mt-5 space-y-3 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <CircleCheck className="w-5 h-5 text-white" />
            <span className="text-white/90">{f}</span>
          </li>
        ))}
      </ul>
      <button
        className="mt-6 w-full py-3 rounded-lg font-semibold !outline-none
        bg-gradient-to-r from-purple-300 to-pink-400
        hover:from-pink-500 hover:to-purple-600
        transition-colors duration-300 shadow-md  dark:from-purple-700 dark:to-pink-700
  dark:hover:from-pink-600 dark:hover:to-purple-800 " 
  onClick={onClick}
      >
        Get Started
      </button>
    </div>
  );
}
