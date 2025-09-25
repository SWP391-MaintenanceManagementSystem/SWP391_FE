import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export default function MainContentLayout({ children }: Props) {
  return (
    <div className="mt-4 py-[48px] px-[12px] h-full flex lg:flex-row flex-col gap-12 flex-1" >
      {children}
    </div>
  );
}
