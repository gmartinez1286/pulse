import type { DateRangeKey } from "@/lib/constants";
import { getChartData, getRangeData } from "@/lib/mock/kpot-fairfax";
import { getDb } from "@/lib/db";

export async function fetchOverviewMetrics(range: DateRangeKey) {
  const db = getDb();
  if (!db) {
    return {
      range: getRangeData(range),
      chart: getChartData(range),
      source: "mock" as const,
    };
  }

  // TODO (Luis): aggregate metrics_daily when live data exists
  return {
    range: getRangeData(range),
    chart: getChartData(range),
    source: "mock" as const,
  };
}
