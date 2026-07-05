import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-11 w-full rounded-md border border-white/15 bg-[#101010] px-3 text-sm text-ink outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20",
      className
    )}
    {...props}
  />
));

Select.displayName = "Select";
