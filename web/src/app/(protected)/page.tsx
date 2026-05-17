import { RecentMatchPanel } from "@/features/match/components/recent-match-panel";
import { FeedSection } from "@/features/posts/components/feed-section";

export default function HomePage() {
  return (
    <div className="grid w-full max-w-[1068px] grid-cols-1 justify-items-center gap-lg xl:grid-cols-[696px_280px] xl:items-start xl:justify-center xl:gap-xl">
      <RecentMatchPanel className="order-1 xl:order-2 xl:sticky xl:top-[88px] xl:self-start" />
      <FeedSection className="order-2 xl:order-1" />
    </div>
  );
}
