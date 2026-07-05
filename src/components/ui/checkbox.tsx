import * as React from "react";
import { cn } from "@/lib/utils";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, type = "checkbox", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-4 w-4 rounded border-white/20 bg-white/5 text-gold accent-gold focus:ring-gold",
        className
      )}
      {...props}
    />
  )
);

Checkbox.displayName = "Checkbox";
