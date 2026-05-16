package com.itda.backend.user.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Lifestyle {

    @Enumerated(EnumType.STRING)
    @Column(name = "housing_type")
    private HousingType housingType;

    @Enumerated(EnumType.STRING)
    @Column(name = "family_type")
    private FamilyType familyType;

    @Enumerated(EnumType.STRING)
    @Column(name = "has_pet")
    private HasPet hasPet;

    @Enumerated(EnumType.STRING)
    @Column(name = "daily_out_time")
    private DailyOutTime dailyOutTime;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
            name = "user_preferred_traits",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "trait", nullable = false)
    private List<Trait> preferredTraits = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "preferred_size")
    private PreferredSize preferredSize;

    @Builder
    public Lifestyle(HousingType housingType,
                     FamilyType familyType,
                     HasPet hasPet,
                     DailyOutTime dailyOutTime,
                     List<Trait> preferredTraits,
                     PreferredSize preferredSize) {
        this.housingType = housingType;
        this.familyType = familyType;
        this.hasPet = hasPet;
        this.dailyOutTime = dailyOutTime;
        this.preferredTraits = preferredTraits != null ? preferredTraits : new ArrayList<>();
        this.preferredSize = preferredSize;
    }

    public boolean isComplete() {
        return housingType != null
                && familyType != null
                && hasPet != null
                && dailyOutTime != null
                && preferredSize != null
                && !preferredTraits.isEmpty();
    }
}
