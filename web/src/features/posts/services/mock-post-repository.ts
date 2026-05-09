import type { PostRepository } from "./post-repository";
import type { Comment, PostDetail } from "../types/post";

let nextPostId = 3;
let nextCommentId = 3;

let mockPosts: PostDetail[] = [
  {
    postId: 1,
    author: { userId: 1, nickname: "초코임보자" },
    dog: { dogId: 1, name: "초코", status: "AVAILABLE" },
    imageUrls: ["/mock/posts/choco-walk-1.jpg", "/mock/posts/choco-walk-2.jpg"],
    caption: "오늘은 공원에서 산책을 오래 했어요. 사람을 보면 꼬리를 흔들어요.",
    likeCount: 24,
    isLiked: false,
    commentCount: 2,
    createdAt: "2026-05-08T09:30:00.000Z",
  },
  {
    postId: 2,
    author: { userId: 2, nickname: "두부임보자" },
    dog: { dogId: 2, name: "두부", status: "AVAILABLE" },
    imageUrls: ["/mock/posts/dubu-home-1.jpg"],
    caption: "두부는 조용한 쿠션 자리를 좋아해요.",
    likeCount: 13,
    isLiked: true,
    commentCount: 0,
    createdAt: "2026-05-07T13:10:00.000Z",
  },
];

const mockComments: Record<number, Comment[]> = {
  1: [
    {
      commentId: 1,
      parentId: null,
      author: { userId: 3, nickname: "입양희망자" },
      content: "초코 산책량은 어느 정도인가요?",
      createdAt: "2026-05-08T10:00:00.000Z",
      replies: [
        {
          commentId: 2,
          parentId: 1,
          author: { userId: 1, nickname: "초코임보자" },
          content: "하루 1시간 정도가 잘 맞아요.",
          createdAt: "2026-05-08T10:15:00.000Z",
        },
      ],
    },
  ],
};

const findPost = (postId: number) => {
  const post = mockPosts.find((item) => item.postId === postId);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export function createMockPostRepository(): PostRepository {
  return {
    async getDogPosts(dogId, cursor = "0", limit = 10) {
      const start = Number(cursor);
      const posts = mockPosts
        .filter((post) => post.dog.dogId === dogId)
        .slice(start, start + limit)
        .map((post) => ({
          postId: post.postId,
          thumbnailUrl: post.imageUrls[0] ?? "",
          caption: post.caption,
          likeCount: post.likeCount,
          commentCount: post.commentCount,
          createdAt: post.createdAt,
        }));

      return {
        posts,
        nextCursor: start + limit < mockPosts.length ? String(start + limit) : null,
      };
    },

    async getFeedPosts(cursor = "0", limit = 10) {
      const start = Number(cursor);
      const posts = mockPosts.slice(start, start + limit).map((post) => ({
        postId: post.postId,
        author: post.author,
        dog: {
          dogId: post.dog.dogId,
          name: post.dog.name,
        },
        thumbnailUrl: post.imageUrls[0] ?? "",
        caption: post.caption,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        createdAt: post.createdAt,
      }));

      return {
        posts,
        nextCursor: start + limit < mockPosts.length ? String(start + limit) : null,
      };
    },

    async createPost(payload) {
      const postId = nextPostId;
      nextPostId += 1;

      mockPosts = [
        {
          postId,
          author: { userId: 1, nickname: "초코임보자" },
          dog: { dogId: payload.dogId, name: "초코", status: "AVAILABLE" },
          imageUrls: payload.imageUrls,
          caption: payload.caption,
          likeCount: 0,
          isLiked: false,
          commentCount: 0,
          createdAt: new Date().toISOString(),
        },
        ...mockPosts,
      ];

      return { postId };
    },

    async getPostDetail(postId) {
      return findPost(postId);
    },

    async updatePost(postId, payload) {
      mockPosts = mockPosts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              ...payload,
            }
          : post
      );
    },

    async deletePost(postId) {
      mockPosts = mockPosts.filter((post) => post.postId !== postId);
    },

    async toggleLike(postId) {
      const post = findPost(postId);
      const isLiked = !post.isLiked;
      const likeCount = post.likeCount + (isLiked ? 1 : -1);

      mockPosts = mockPosts.map((item) =>
        item.postId === postId
          ? {
              ...item,
              isLiked,
              likeCount,
            }
          : item
      );

      return { isLiked, likeCount };
    },

    async getComments(postId, cursor = "0", limit = 10) {
      const start = Number(cursor);
      const comments = (mockComments[postId] ?? []).slice(start, start + limit);

      return {
        comments,
        nextCursor: start + limit < (mockComments[postId]?.length ?? 0) ? String(start + limit) : null,
      };
    },

    async createComment(postId, payload) {
      const comment = {
        commentId: nextCommentId,
        parentId: payload.parentId,
        author: { userId: 1, nickname: "초코임보자" },
        content: payload.content,
        createdAt: new Date().toISOString(),
        replies: [],
      };
      nextCommentId += 1;

      mockComments[postId] = [comment, ...(mockComments[postId] ?? [])];

      return {
        commentId: comment.commentId,
        parentId: comment.parentId,
        content: comment.content,
        createdAt: comment.createdAt,
      };
    },

    async deleteComment(postId, commentId) {
      mockComments[postId] = (mockComments[postId] ?? []).filter(
        (comment) => comment.commentId !== commentId
      );
    },
  };
}
