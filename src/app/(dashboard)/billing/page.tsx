import { PhaseBanner } from "@/components/shared/phase-banner";
import { KpiCard } from "@/components/cards/kpi-card";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Starter",
    price: "$100",
    featured: false,
    features: ["1 location", "Paid + organic", "Monthly PDF", "Live share link"],
  },
  {
    name: "Growth",
    price: "$200",
    featured: true,
    features: [
      "Up to 3 locations",
      "Coupon tracking",
      "Weekly snapshots",
      "Audience insights",
    ],
  },
  {
    name: "Agency",
    price: "$400",
    featured: false,
    features: [
      "Unlimited locations",
      "White-label",
      "AI summaries",
      "Client self-connect",
    ],
  },
];

export default function BillingPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <PhaseBanner phase={3} label="Productization preview — pricing tiers for multi-client rollout" />

      <KpiCard icon="📦" label="Current plan" value="Internal" delta="$0/mo" deltaDirection="up" className="col-span-4" />
      <KpiCard icon="☁" label="Infra cost" value="$31" delta="Vercel + Supabase" deltaDirection="up" className="col-span-4" />
      <KpiCard icon="💵" label="Potential revenue" value="$1,300/mo" delta="5 clients @ Growth tier" deltaDirection="up" className="col-span-4" />

      {TIERS.map((tier) => (
        <Card
          key={tier.name}
          className={cn(
            "col-span-4 text-center",
            tier.featured && "border-accent bg-accent-soft"
          )}
        >
          <div className="text-xs font-bold uppercase tracking-wide text-muted">
            {tier.name}
          </div>
          <div className="my-2 text-[30px] font-[650] tracking-tight">
            {tier.price}
            <small className="text-xs font-medium text-muted">/mo</small>
          </div>
          <ul className="mt-3 list-none text-left text-xs text-muted">
            {tier.features.map((f) => (
              <li key={f} className="border-b border-line py-1.5 last:border-0">
                <b className="text-ink">{f}</b>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
