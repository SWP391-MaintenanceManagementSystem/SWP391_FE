import * as React from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function MainContentLayout({ children, className }: Props) {
  return (
    <div
      className={cn(
        "mt-4 pb-12 px-[12px] h-full min-w-full  overflow-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
