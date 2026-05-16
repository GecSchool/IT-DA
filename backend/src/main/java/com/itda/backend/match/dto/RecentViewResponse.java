package com.itda.backend.match.dto;

import com.itda.backend.dog.domain.Dog;

public record RecentViewResponse(
        Long dogId,
        String name,
        String breed,
        String thumbnailUrl,
        String regionSido,
        String regionSigungu
) {
    public static RecentViewResponse from(Dog dog) {
        String thumbnailUrl = dog.getImages().isEmpty() ? null
                : dog.getImages().get(0).getImageUrl();
        return new RecentViewResponse(
                dog.getId(),
                dog.getName(),
                dog.getBreed(),
                thumbnailUrl,
                dog.getRegionSido(),
                dog.getRegionSigungu()
        );
    }
}
