import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-pb-primary text-white dark:text-[#15131F] font-semibold hover:opacity-90 shadow-sm",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 font-semibold shadow-sm",
        navy:
          "bg-[#1F1B3A] text-white hover:bg-[#2B2650] dark:bg-[#B7AEFA] dark:text-[#15131F] dark:hover:bg-[#C8C1FB] font-semibold shadow-sm",
        secondary:
          "bg-pb-primary-soft text-pb-primary hover:bg-opacity-80 font-medium",
        outline:
          "border border-pb-border bg-transparent text-pb-text-primary hover:bg-pb-primary-soft hover:text-pb-primary",
        ghost:
          "text-pb-text-secondary hover:text-pb-text-primary hover:bg-pb-primary-soft/50",
        link: "text-pb-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-base font-semibold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
