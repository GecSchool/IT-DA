import { z } from "zod";

export const NICKNAME_RULE_MESSAGE = "닉네임은 한글 2~10자로 입력해주세요.";

export const profileSetupSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(2, NICKNAME_RULE_MESSAGE)
    .max(10, NICKNAME_RULE_MESSAGE)
    .regex(/^[가-힣]+$/, NICKNAME_RULE_MESSAGE),
  regionSido: z.string().min(1, "시/도를 선택해주세요."),
  regionSigungu: z.string().min(1, "시/군/구를 선택해주세요."),
});

export type ProfileSetupFormValues = z.infer<typeof profileSetupSchema>;
