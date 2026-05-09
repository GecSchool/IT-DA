import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { postRepository } from "../services";
import { postQueryKeys } from "./post-query-keys";

export function useFeedPostsQuery(limit = 10) {
  return useInfiniteQuery({
    queryKey: postQueryKeys.feedList(limit),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => postRepository.getFeedPosts(pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export function useDogPostsQuery(dogId: number, limit = 10) {
  return useInfiniteQuery({
    queryKey: postQueryKeys.dogPostList(dogId, limit),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => postRepository.getDogPosts(dogId, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export function usePostDetailQuery(postId: number) {
  return useQuery({
    queryKey: postQueryKeys.detail(postId),
    queryFn: () => postRepository.getPostDetail(postId),
  });
}

export function useCommentsQuery(postId: number, limit = 10) {
  return useInfiniteQuery({
    queryKey: postQueryKeys.commentList(postId, limit),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => postRepository.getComments(postId, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
