import type {
  Comment,
  CommentCreateResponse,
  CursorPage,
  DogPostSummary,
  PostDetail,
  PostFeedItem,
} from "../types/post";
import type {
  CommentCreatePayload,
  PostCreatePayload,
  PostUpdatePayload,
} from "../types/post-payload";

export interface PostRepository {
  getDogPosts(dogId: number, cursor?: string, limit?: number): Promise<CursorPage<{ posts: DogPostSummary[] }>>;
  getFeedPosts(cursor?: string, limit?: number): Promise<CursorPage<{ posts: PostFeedItem[] }>>;
  createPost(payload: PostCreatePayload): Promise<{ postId: number }>;
  getPostDetail(postId: number): Promise<PostDetail>;
  updatePost(postId: number, payload: PostUpdatePayload): Promise<void>;
  deletePost(postId: number): Promise<void>;
  toggleLike(postId: number): Promise<{ isLiked: boolean; likeCount: number }>;
  getComments(postId: number, cursor?: string, limit?: number): Promise<CursorPage<{ comments: Comment[] }>>;
  createComment(postId: number, payload: CommentCreatePayload): Promise<CommentCreateResponse>;
  deleteComment(postId: number, commentId: number): Promise<void>;
}
