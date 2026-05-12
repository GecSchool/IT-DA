package com.itda.backend.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record OnboardingRequest(
        @NotBlank @Size(min = 2, max = 20) String nickname,
        @NotBlank String regionSido,
        @NotBlank String regionSigungu
) {
}
