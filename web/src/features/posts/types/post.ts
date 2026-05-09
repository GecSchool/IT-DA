import type { DogStatus } from "@/features/dogs/types/dog";

export type Author = {
  userId: number;
  nickname: string;
};

export type PostFeedItem = {
  postId: number;
  author: Author;
  dog: {
    dogId: number;
    name: string;
  };
  thumbnailUrl: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
};

export type DogPostSummary = {
  postId: number;
  thumbnailUrl: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
};

export type PostDetail = {
  postId: number;
  author: Author;
  dog: {
    dogId: number;
    name: string;
    status: DogStatus;
  };
  imageUrls: string[];
  caption: string;
  likeCount: number;
  isLiked: boolean;
  commentCount: number;
  createdAt: string;
};

export type CursorPage<T> = {
  nextCursor: string | null;
} & T;

export type CommentReply = {
  commentId: number;
  parentId: number;
  author: Author;
  content: string;
  createdAt: string;
};

export type Comment = {
  commentId: number;
  parentId: number | null;
  author: Author;
  content: string;
  createdAt: string;
  replies: CommentReply[];
};

export type CommentCreateResponse = {
  commentId: number;
  parentId: number | null;
  content: string;
  createdAt: string;
};
