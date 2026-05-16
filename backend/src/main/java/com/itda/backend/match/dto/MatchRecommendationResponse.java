package com.itda.backend.match.dto;

import com.itda.backend.dog.domain.Dog;

public record MatchRecommendationResponse(
        Long dogId,
        String name,
        String breed,
        String thumbnailUrl,
        String regionSido,
        String regionSigungu,
        int matchScore
) {
    public static MatchRecommendationResponse of(Dog dog, int matchScore) {
        String thumbnailUrl = dog.getImages().isEmpty() ? null
                : dog.getImages().get(0).getImageUrl();
        return new MatchRecommendationResponse(
                dog.getId(),
                dog.getName(),
                dog.getBreed(),
                thumbnailUrl,
                dog.getRegionSido(),
                dog.getRegionSigungu(),
                matchScore
        );
    }
}
