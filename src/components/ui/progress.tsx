import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  color,
  gradient,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  color?: string;
  gradient?: boolean;
}) {
  const background = gradient
    ? `linear-gradient(90deg, ${color} 0%, ${color}CC 50%, ${color}99 100%)`
    : color || "hsl(var(--primary))";

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all duration-700 ease-in-out"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          background,
          transition: "all 0.7s ease-in-out", // mượt hơn
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
