package com.itda.backend.user.dto.request;

import com.itda.backend.user.domain.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record LifestyleRequest(
        @NotNull HousingType housingType,
        @NotNull FamilyType familyType,
        @NotNull HasPet hasPet,
        @NotNull DailyOutTime dailyOutTime,
        @NotEmpty List<Trait> preferredTraits,
        @NotNull PreferredSize preferredSize
) {
    public Lifestyle toEntity() {
        return Lifestyle.builder()
                .housingType(housingType)
                .familyType(familyType)
                .hasPet(hasPet)
                .dailyOutTime(dailyOutTime)
                .preferredTraits(preferredTraits)
                .preferredSize(preferredSize)
                .build();
    }
}
