import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authRepository } from "../services";
import { authQueryKeys } from "./auth-query-keys";

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
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile() });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRepository.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    },
  });
}

export function useDeleteAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRepository.deleteAccount,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    },
  });
}
