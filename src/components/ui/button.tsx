import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:bg-lux-hover hover:text-white focus-visible:ring-gold shadow-gold",
  secondary: "bg-gold text-black hover:bg-champagne focus-visible:ring-gold",
  outline:
    "border border-white/15 bg-white/5 text-ink hover:border-gold/70 hover:bg-white/10 focus-visible:ring-gold",
  ghost: "bg-transparent text-ink hover:bg-white/10 focus-visible:ring-gold",
  danger: "bg-red-500/15 text-red-200 hover:bg-red-500/25 focus-visible:ring-red-300"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
