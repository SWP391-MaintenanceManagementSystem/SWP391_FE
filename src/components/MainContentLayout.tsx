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
        "mt-4 pt-4 pb-12 px-[12px] h-full w-full overflow-y-auto max-h-[calc(100vh-30px)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
