import { format, subDays, startOfMonth } from "date-fns";
import type { DateRangeKey } from "@/lib/constants";

export function getDateRange(key: DateRangeKey): {
  since: Date;
  until: Date;
  days: number;
} {
  const until = new Date(2026, 5, 11);
  switch (key) {
    case "d30":
      return { since: subDays(until, 29), until, days: 30 };
    case "d14":
      return { since: subDays(until, 13), until, days: 14 };
    case "mtd":
      return { since: startOfMonth(until), until, days: 11 };
  }
}

export function formatChartDate(date: Date): string {
  return format(date, "MMM d");
}

export function formatRelativeTime(minutesAgo: number): string {
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hours = Math.floor(minutesAgo / 60);
  return `${hours}h ago`;
}
