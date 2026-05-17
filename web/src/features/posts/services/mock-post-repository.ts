import type { PostRepository } from "./post-repository";
import type { Author, Comment, PostDetail } from "../types/post";

let nextPostId = 15;
let nextCommentId = 3;

const mockAuthors: Author[] = [
  { userId: 1, nickname: "초코임보자" },
  { userId: 2, nickname: "두부임보자" },
  { userId: 4, nickname: "보리임보자" },
  { userId: 5, nickname: "콩이임보자" },
];

const mockDogs: PostDetail["dog"][] = [
  { dogId: 1, name: "초코", status: "AVAILABLE" },
  { dogId: 2, name: "두부", status: "AVAILABLE" },
  { dogId: 3, name: "보리", status: "AVAILABLE" },
  { dogId: 4, name: "콩이", status: "ADOPTED" },
];

const mockCaptions = [
  "오늘은 공원에서 산책을 오래 했어요. 사람을 보면 꼬리를 흔들어요.",
  "두부는 조용한 쿠션 자리를 좋아해요.",
  "보리가 드디어 앉아! 를 배웠어요. 너무 기특해서 간식 왕창 줬음.",
  "콩이는 햇빛 드는 자리에서 낮잠 자는 걸 제일 좋아해요.",
  "낯선 소리에는 조금 놀라지만 이름을 부르면 금방 다가와요.",
  "오늘 병원 다녀왔는데 접종도 씩씩하게 잘 마쳤어요.",
  "비 오는 날이라 실내에서 노즈워크 놀이를 했어요.",
  "산책길에서 다른 강아지를 만나도 차분하게 인사했어요.",
  "밥 먹고 장난감을 물고 와서 같이 놀자고 해요.",
  "처음 보는 사람에게도 조심스럽게 꼬리를 흔드는 중이에요.",
  "하네스 적응 훈련을 조금씩 하고 있어요.",
  "밤에는 자기 방석에서 조용히 잘 자요.",
  "계단은 아직 무서워하지만 한 칸씩 연습 중이에요.",
  "오늘은 차 타는 연습을 했고 생각보다 잘 버텼어요.",
];

const createMockPost = (index: number): PostDetail => {
  const postId = index + 1;
  const dog = mockDogs[index % mockDogs.length];
  const imageCount = index % 4 === 0 ? 3 : index % 3 === 0 ? 2 : 1;

  return {
    postId,
    author: mockAuthors[index % mockAuthors.length],
    dog,
    imageUrls: Array.from(
      { length: imageCount },
      (_, imageIndex) => `/mock/posts/post-${postId}-${imageIndex + 1}.jpg`
    ),
    caption: mockCaptions[index],
    likeCount: 8 + index * 3,
    isLiked: index % 3 === 0,
    commentCount: index % 5,
    createdAt: new Date(Date.UTC(2026, 4, 8 - Math.floor(index / 2), 9 + index, 30)).toISOString(),
  };
};

let mockPosts: PostDetail[] = [
  ...Array.from({ length: 14 }, (_, index) => createMockPost(index)),
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
        imageUrls: post.imageUrls,
        caption: post.caption,
        likeCount: post.likeCount,
        isLiked: post.isLiked,
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

      if (payload.parentId) {
        mockComments[postId] = (mockComments[postId] ?? []).map((item) =>
          item.commentId === payload.parentId
            ? {
                ...item,
                replies: [...item.replies, { ...comment, parentId: payload.parentId }],
              }
            : item
        );
      } else {
        mockComments[postId] = [comment, ...(mockComments[postId] ?? [])];
      }

      return {
        commentId: comment.commentId,
        parentId: comment.parentId,
        content: comment.content,
        createdAt: comment.createdAt,
      };
    },

    async deleteComment(postId, commentId) {
      mockComments[postId] = (mockComments[postId] ?? [])
        .filter((comment) => comment.commentId !== commentId)
        .map((comment) => ({
          ...comment,
          replies: comment.replies.filter((reply) => reply.commentId !== commentId),
        }));
    },
  };
}
