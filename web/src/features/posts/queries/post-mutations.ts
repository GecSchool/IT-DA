import type { InfiniteData } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postRepository } from "../services";
import type { CursorPage, PostDetail, PostFeedItem } from "../types/post";
import type { CommentCreatePayload, PostUpdatePayload } from "../types/post-payload";
import { postQueryKeys } from "./post-query-keys";

type FeedPostsData = InfiniteData<CursorPage<{ posts: PostFeedItem[] }>, string | undefined>;

type UpdatePostVariables = {
  postId: number;
  payload: PostUpdatePayload;
};

type CreateCommentVariables = {
  postId: number;
  payload: CommentCreatePayload;
};

type DeleteCommentVariables = {
  postId: number;
  commentId: number;
};

const getNextLikeState = (isLiked: boolean, likeCount: number) => ({
  isLiked: !isLiked,
  likeCount: likeCount + (isLiked ? -1 : 1),
});

const updateFeedPostLike = (current: FeedPostsData | undefined, postId: number) => {
  if (!current) {
    return current;
  }

  return {
    ...current,
    pages: current.pages.map((page) => ({
      ...page,
      posts: page.posts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              ...getNextLikeState(post.isLiked, post.likeCount),
            }
          : post
      ),
    })),
  };
};

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRepository.createPost,
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.feed() });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.dogPosts(payload.dogId) });
    },
  });
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, payload }: UpdatePostVariables) =>
      postRepository.updatePost(postId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(variables.postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.feed() });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRepository.deletePost,
    onSuccess: (_data, postId) => {
      queryClient.removeQueries({ queryKey: postQueryKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.feed() });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}

export function useTogglePostLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRepository.toggleLike,
    onMutate: async (postId: number) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: postQueryKeys.detail(postId) }),
        queryClient.cancelQueries({ queryKey: postQueryKeys.feed() }),
      ]);

      const previousDetail = queryClient.getQueryData<PostDetail>(postQueryKeys.detail(postId));
      const previousFeedQueries = queryClient.getQueriesData<FeedPostsData>({
        queryKey: postQueryKeys.feed(),
      });

      queryClient.setQueryData<PostDetail>(postQueryKeys.detail(postId), (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          ...getNextLikeState(current.isLiked, current.likeCount),
        };
      });

      queryClient.setQueriesData<FeedPostsData>({ queryKey: postQueryKeys.feed() }, (current) => {
        return updateFeedPostLike(current, postId);
      });

      return { previousDetail, previousFeedQueries };
    },
    onError: (_error, postId, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(postQueryKeys.detail(postId), context.previousDetail);
      }

      if (context?.previousFeedQueries) {
        context.previousFeedQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: (_data, _error, postId) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.feed() });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}

export function useCreateCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, payload }: CreateCommentVariables) =>
      postRepository.createComment(postId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.comments(variables.postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(variables.postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.feed() });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentVariables) =>
      postRepository.deleteComment(postId, commentId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.comments(variables.postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(variables.postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.feed() });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}
