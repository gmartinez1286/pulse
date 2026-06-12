import { cn } from "@/lib/utils";

export function DeltaChip({
  value,
  direction,
}: {
  value: string;
  direction: "up" | "down";
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-xl px-2 py-0.5 text-[10.5px] font-semibold",
        direction === "up"
          ? "bg-positive-soft text-positive"
          : "bg-negative-soft text-negative"
      )}
    >
      {value}
    </span>
  );
}
