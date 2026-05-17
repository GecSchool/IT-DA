import { z } from "zod";

export const postCreateFormSchema = z.object({
  dogId: z.number().min(1, "게시물을 올릴 강아지를 선택해주세요."),
  caption: z.string().trim().max(500, "캡션은 500자 이하로 입력해주세요."),
});

export type PostCreateFormValues = z.infer<typeof postCreateFormSchema>;
