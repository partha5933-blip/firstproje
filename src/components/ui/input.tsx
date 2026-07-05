import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-gold/70 focus:ring-2 focus:ring-gold/20",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";
