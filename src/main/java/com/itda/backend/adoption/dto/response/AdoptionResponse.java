package com.itda.backend.adoption.dto.response;

import com.itda.backend.adoption.domain.Adoption;
import com.itda.backend.adoption.domain.AdoptionStatus;

import java.time.LocalDateTime;

public record AdoptionResponse(
        Long adoptionId,
        Long dogId,
        String dogName,
        String thumbnailUrl,
        AdoptionStatus status,
        String introduction,
        String contactEmail,
        LocalDateTime appliedAt
) {
    public static AdoptionResponse from(Adoption adoption) {
        String thumbnailUrl = adoption.getDog().getImages().isEmpty() ? null
                : adoption.getDog().getImages().get(0).getImageUrl();
        String contactEmail = adoption.getStatus() == AdoptionStatus.ACCEPTED
                ? adoption.getDog().getFoster().getEmail() : null;
        return new AdoptionResponse(
                adoption.getId(),
                adoption.getDog().getId(),
                adoption.getDog().getName(),
                thumbnailUrl,
                adoption.getStatus(),
                adoption.getIntroduction(),
                contactEmail,
                adoption.getCreatedAt()
        );
    }
}