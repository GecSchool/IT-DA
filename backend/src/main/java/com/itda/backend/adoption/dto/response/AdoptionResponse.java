package com.itda.backend.adoption.dto.response;

import com.itda.backend.adoption.domain.Adoption;
import com.itda.backend.adoption.domain.AdoptionStatus;

import java.time.LocalDateTime;

public record AdoptionResponse(
        Long adoptionId,
        DogInfo dog,
        AdoptionStatus status,
        String introduction,
        ContactInfo contactInfo,
        LocalDateTime appliedAt
) {
    public record DogInfo(Long dogId, String name, String thumbnailUrl) {}
    public record ContactInfo(String email) {}

    public static AdoptionResponse from(Adoption adoption) {
        String thumbnailUrl = adoption.getDog().getImages().isEmpty() ? null
                : adoption.getDog().getImages().get(0).getImageUrl();

        ContactInfo contactInfo = adoption.getStatus() == AdoptionStatus.ACCEPTED
                ? new ContactInfo(adoption.getDog().getFoster().getEmail())
                : null;

        return new AdoptionResponse(
                adoption.getId(),
                new DogInfo(
                        adoption.getDog().getId(),
                        adoption.getDog().getName(),
                        thumbnailUrl
                ),
                adoption.getStatus(),
                adoption.getIntroduction(),
                contactInfo,
                adoption.getCreatedAt()
        );
    }
}