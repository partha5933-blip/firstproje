import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-md border border-white/15 bg-white/[0.04] px-3 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-gold/70 focus:ring-2 focus:ring-gold/20",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
