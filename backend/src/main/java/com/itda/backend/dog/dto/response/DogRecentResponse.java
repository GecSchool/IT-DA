package com.itda.backend.dog.dto.response;

import com.itda.backend.dog.domain.Dog;

public record DogRecentResponse(
        Long dogId,
        String name,
        String thumbnailUrl
) {
    public static DogRecentResponse from(Dog dog) {
        String thumbnailUrl = dog.getImages().isEmpty() ? null
                : dog.getImages().get(0).getImageUrl();
        return new DogRecentResponse(
                dog.getId(),
                dog.getName(),
                thumbnailUrl
        );
    }
}