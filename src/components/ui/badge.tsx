import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-badge px-2 py-0.5 text-[11px] font-semibold",
  {
    variants: {
      variant: {
        default: "bg-gray-soft text-muted",
        run: "bg-positive-soft text-positive",
        end: "bg-gray-soft text-muted",
        p2: "bg-accent-soft text-accent-text",
        pend: "bg-warn-soft text-warn",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
