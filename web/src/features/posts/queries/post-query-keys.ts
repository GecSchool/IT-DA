export const postQueryKeys = {
  all: ["posts"] as const,
  feed: () => [...postQueryKeys.all, "feed"] as const,
  feedList: (limit?: number) => [...postQueryKeys.feed(), { limit }] as const,
  dogPosts: (dogId: number) => [...postQueryKeys.all, "dog", dogId] as const,
  dogPostList: (dogId: number, limit?: number) => [...postQueryKeys.dogPosts(dogId), { limit }] as const,
  detail: (postId: number) => [...postQueryKeys.all, "detail", postId] as const,
  comments: (postId: number) => [...postQueryKeys.detail(postId), "comments"] as const,
  commentList: (postId: number, limit?: number) => [...postQueryKeys.comments(postId), { limit }] as const,
};
