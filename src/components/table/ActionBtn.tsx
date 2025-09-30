import type { ReactNode } from "react";

interface ActionsBtnProps {
  icon: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ActionBtn({ icon, onClick }: ActionsBtnProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded hover:bg-accent bg-white dark:bg-gray-dark-bg dark:border-gray-500 transition border-1 border-[#CED4DA] !outline-none "
    >
      {icon}
    </button>
  );
}
