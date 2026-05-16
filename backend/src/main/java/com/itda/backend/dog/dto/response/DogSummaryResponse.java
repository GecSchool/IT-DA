package com.itda.backend.dog.dto.response;

import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.domain.DogStatus;

public record DogSummaryResponse(
        Long dogId,
        String name,
        String thumbnailUrl,
        DogStatus status,
        int applicationCount
) {
    public static DogSummaryResponse from(Dog dog, int applicationCount) {
        String thumbnailUrl = dog.getImages().isEmpty() ? null
                : dog.getImages().get(0).getImageUrl();
        return new DogSummaryResponse(
                dog.getId(),
                dog.getName(),
                thumbnailUrl,
                dog.getStatus(),
                applicationCount
        );
    }
}
