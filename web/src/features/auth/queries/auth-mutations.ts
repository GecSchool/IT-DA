import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clearAccessToken, setAccessToken } from "@/shared/lib/access-token-store";

import { authRepository } from "../services";
import { authQueryKeys } from "./auth-query-keys";

export function useRefreshAccessTokenMutation() {
  return useMutation({
    mutationFn: authRepository.refreshAccessToken,
    onSuccess: ({ accessToken }) => {
      setAccessToken(accessToken);
    },
  });
}

export function useCompleteOnboardingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRepository.completeOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.session() });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile() });
    },
  });
}

export function useUpdateMyProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRepository.updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.session() });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile() });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRepository.logout,
    onSuccess: () => {
      clearAccessToken();
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    },
  });
}

export function useDeleteAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRepository.deleteAccount,
    onSuccess: () => {
      clearAccessToken();
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    },
  });
}
