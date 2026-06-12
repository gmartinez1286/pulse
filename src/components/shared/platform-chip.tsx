import { cn } from "@/lib/utils";

export function PlatformChip({
  platform,
}: {
  platform: "facebook" | "instagram" | "fb" | "ig";
}) {
  const isFb = platform === "facebook" || platform === "fb";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[5px] px-1.5 py-0.5 text-[10px] font-bold",
        isFb ? "bg-fb-soft text-fb" : "bg-ig-soft text-ig"
      )}
    >
      {isFb ? "FB" : "IG"}
    </span>
  );
}
