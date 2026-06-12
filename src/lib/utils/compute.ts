export function ctr(clicks: number, impressions: number): number {
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
}

export function cpc(spend: number, clicks: number): number {
  if (clicks === 0) return 0;
  return spend / clicks;
}

export function cpm(spend: number, impressions: number): number {
  if (impressions === 0) return 0;
  return (spend / impressions) * 1000;
}

export function engagementRate(
  engagements: number,
  reach: number
): number {
  if (reach === 0) return 0;
  return (engagements / reach) * 100;
}

export function costPerResult(spend: number, results: number): number {
  if (results === 0) return 0;
  return spend / results;
}

export function deltaPct(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
