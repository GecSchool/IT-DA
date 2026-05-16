import { DogPostThumbnail } from "@/features/posts/components/dog-post-thumbnail";
import type { DogPostSummary } from "@/features/posts/types/post";

type DogPostGridProps = {
  posts: DogPostSummary[];
};

export function DogPostGrid({ posts }: DogPostGridProps) {
  return (
    <div className="grid w-full auto-rows-max grid-cols-3 gap-0">
      {posts.map((post) => (
        <DogPostThumbnail key={post.postId} post={post} />
      ))}
    </div>
  );
}
