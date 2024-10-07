import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import cn from "@/lib/utils";

import Spinner from "../loaders/buttonSpinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center  whitespace-nowrap rounded-lg text-xs font-normal  transition-colors focus-visible:outline-none focus-visible:ring-none focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50 [&>span]:font-bold",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-tertiary-white-100",
        destructive: "bg-tertiary-red-600 text-white hover:bg-tertiary-red-400",
        outline:
          "border-tertiary-white-100 text-tertiary-white-100 border-2 border-solid bg-transparent  hover:bg-tertiary-white-100  hover:text-tertiary-deep-green-950",
        "deep-green":
          "bg-tertiary-deep-green-950 text-tertiary-white-100 hover:bg-primary-100 hover:text-tertiary-deep-green-950 ",
        "light-green":
          "bg-primary-100 text-tertiary-deep-green-950 hover:bg-tertiary-deep-green-950 hover:text-tertiary-white-100",
        white:
          "bg-tertiary-white-100 text-tertiary-white-900 hover:bg-tertiary-white-200",
        plain: "",
      },
      size: {
        default: " px-7 py-4",
        sm: "rounded-md py-3 px-5",
        plain: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size,
      asChild = false,
      children,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "gap-4")}
        ref={ref}
        {...props}
      >
        <span>{children}</span>
        {loading && <Spinner />}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
