import * as React from "react";
import type { ReactNode } from "react";

interface ActionBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

const ActionBtn = React.forwardRef<HTMLButtonElement, ActionBtnProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`p-2 rounded hover:bg-accent bg-white dark:bg-gray-dark-bg dark:border-gray-500 transition border border-[#CED4DA] !outline-none ${className ?? ""}`}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

ActionBtn.displayName = "ActionBtn";

export default ActionBtn;
