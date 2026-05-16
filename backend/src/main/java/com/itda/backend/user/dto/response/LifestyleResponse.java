package com.itda.backend.user.dto.response;

import com.itda.backend.user.domain.*;

import java.util.List;

public record LifestyleResponse(
        HousingType housingType,
        FamilyType familyType,
        HasPet hasPet,
        DailyOutTime dailyOutTime,
        List<Trait> preferredTraits,
        PreferredSize preferredSize
) {
    public static LifestyleResponse from(Lifestyle lifestyle) {
        if (lifestyle == null) return null;
        return new LifestyleResponse(
                lifestyle.getHousingType(),
                lifestyle.getFamilyType(),
                lifestyle.getHasPet(),
                lifestyle.getDailyOutTime(),
                lifestyle.getPreferredTraits(),
                lifestyle.getPreferredSize()
        );
    }
}
