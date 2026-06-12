import { TOP_POSTS } from "@/lib/mock/kpot-fairfax";
import { PlatformChip } from "@/components/shared/platform-chip";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export function TopPostsSection({ delay = 0.46 }: { delay?: number }) {
  return (
    <Card
      className="col-span-12 opacity-0 animate-rise"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardHeader>
        <div>
          <CardTitle>Top performing content</CardTitle>
          <CardDescription>
            Ranked by engagement rate · replicate these
          </CardDescription>
        </div>
      </CardHeader>
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {TOP_POSTS.map((post) => (
          <div
            key={post.title}
            className="rounded-[13px] border border-line bg-surface-card2 p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-gradient-to-br from-accent-soft to-gray-soft text-xl">
                {post.emoji}
              </div>
              <div>
                <div className="text-[10.5px] font-semibold text-muted">
                  {post.date} ·{" "}
                  <PlatformChip platform="ig" /> · {post.format}
                </div>
                <div className="mt-0.5 text-[12.5px] font-semibold leading-snug">
                  {post.title}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-[11.5px] font-medium text-muted">
              <span>❤ {post.likes.toLocaleString()}</span>
              <span>💬 {post.comments}</span>
              <span>↗ {post.shares}</span>
              <span>🔖 {post.saves}</span>
              <span className="ml-auto font-semibold text-positive">
                {post.er} ER
              </span>
            </div>
            <div className="mt-1.5 flex gap-3 text-[11.5px] text-muted">
              <span>Reach {post.reach}</span>
              <span>Clicks {post.clicks}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
