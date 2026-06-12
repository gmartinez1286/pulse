const HEALTH_ITEMS = [
  { label: "Marketing API", value: "Connected", status: "ok" as const },
  { label: "Pages API", value: "Connected", status: "ok" as const },
  { label: "IG Graph API", value: "Connected", status: "ok" as const },
  { label: "Attribution window", value: "7d click · 1d view", status: "ok" as const },
  { label: "Token root", value: "Temporary BM", status: "warn" as const },
  { label: "Post snapshots", value: "Last 6h ago", status: "ok" as const },
];

export function SyncHealth() {
  return (
    <ul className="list-none">
      {HEALTH_ITEMS.map((item) => (
        <li
          key={item.label}
          className="flex justify-between border-b border-line py-2 text-[12.5px] last:border-0"
        >
          <span className="text-muted">{item.label}</span>
          <span
            className={
              item.status === "ok"
                ? "font-semibold text-positive"
                : "font-semibold text-warn"
            }
          >
            {item.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
