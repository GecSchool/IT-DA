package com.itda.backend.user.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(
        @NotBlank @Size(min = 2, max = 20) String nickname,
        @NotBlank String regionSido,
        @NotBlank String regionSigungu,
        @NotNull @Valid LifestyleRequest lifestyle
) {
}
