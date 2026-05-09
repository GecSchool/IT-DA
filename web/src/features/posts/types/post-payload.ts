export type PostCreatePayload = {
  dogId: number;
  caption: string;
  imageUrls: string[];
};

export type PostUpdatePayload = {
  caption: string;
  imageUrls: string[];
};

export type CommentCreatePayload = {
  content: string;
  parentId: number | null;
};
