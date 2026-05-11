package com.itda.backend.auth.dto;

import com.itda.backend.user.domain.ProfileStatus;
import com.itda.backend.user.domain.User;
import lombok.Builder;

@Builder
public record AuthMeResponse(
        Long userId,
        String email,
        String nickname,
        ProfileStatus profileStatus,
        String regionSido,
        String regionSigungu
) {
    public static AuthMeResponse from(User user) {
        return AuthMeResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileStatus(user.getProfileStatus())
                .regionSido(user.getRegionSido())
                .regionSigungu(user.getRegionSigungu())
                .build();
    }
}
