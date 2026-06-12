import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusVariant = "run" | "end" | "p2" | "pend" | "escalated";

const labels: Record<StatusVariant, string> = {
  run: "Running",
  end: "Ended",
  p2: "P2",
  pend: "Pending",
  escalated: "Escalated",
};

export function StatusBadge({
  variant,
  children,
  className,
}: {
  variant: StatusVariant;
  children?: React.ReactNode;
  className?: string;
}) {
  if (variant === "escalated") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-badge bg-negative-soft px-2 py-0.5 text-[11px] font-semibold text-negative",
          className
        )}
      >
        {children ?? labels.escalated}
      </span>
    );
  }

  return (
    <Badge variant={variant} className={className}>
      {children ?? labels[variant]}
    </Badge>
  );
}
