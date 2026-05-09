import { useQuery } from "@tanstack/react-query";

import { authRepository } from "../services";
import { authQueryKeys } from "./auth-query-keys";

export function useCurrentSessionQuery() {
  return useQuery({
    queryKey: authQueryKeys.session(),
    queryFn: () => authRepository.getCurrentSession(),
  });
}

export function useMyProfileQuery() {
  return useQuery({
    queryKey: authQueryKeys.profile(),
    queryFn: () => authRepository.getMyProfile(),
  });
}

export function useCheckNicknameQuery(nickname: string, enabled = false) {
  return useQuery({
    queryKey: authQueryKeys.nickname(nickname),
    queryFn: () => authRepository.checkNickname(nickname),
    enabled: enabled && nickname.trim().length >= 2,
  });
}
