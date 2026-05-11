import { z } from "zod";

export const adoptionApplicationSchema = z.object({
  introduction: z
    .string()
    .trim()
    .min(10, "신청 내용을 10자 이상 입력해주세요.")
    .max(200, "신청 내용은 200자 이하로 입력해주세요."),
});

export type AdoptionApplicationFormValues = z.infer<typeof adoptionApplicationSchema>;
