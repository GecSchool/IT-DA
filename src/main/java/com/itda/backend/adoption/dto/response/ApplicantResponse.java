package com.itda.backend.adoption.dto.response;

import com.itda.backend.adoption.domain.Adoption;
import com.itda.backend.adoption.domain.AdoptionStatus;

import java.time.LocalDateTime;

public record ApplicantResponse(
        Long adoptionId,
        Long dogId,
        Long applicantId,
        String applicantNickname,
        String housingType,
        String familyType,
        String dailyOutTime,
        int matchScore,
        String introduction,
        AdoptionStatus status,
        String contactEmail,
        LocalDateTime appliedAt
) {
    public static ApplicantResponse from(Adoption adoption) {
        String contactEmail = adoption.getStatus() == AdoptionStatus.ACCEPTED
                ? adoption.getApplicant().getEmail() : null;
        String housingType = adoption.getApplicant().getLifestyle() != null
                ? adoption.getApplicant().getLifestyle().getHousingType().name() : null;
        String familyType = adoption.getApplicant().getLifestyle() != null
                ? adoption.getApplicant().getLifestyle().getFamilyType().name() : null;
        String dailyOutTime = adoption.getApplicant().getLifestyle() != null
                ? adoption.getApplicant().getLifestyle().getDailyOutTime().name() : null;
        return new ApplicantResponse(
                adoption.getId(),
                adoption.getDog().getId(),
                adoption.getApplicant().getId(),
                adoption.getApplicant().getNickname(),
                housingType,
                familyType,
                dailyOutTime,
                0,
                adoption.getIntroduction(),
                adoption.getStatus(),
                contactEmail,
                adoption.getCreatedAt()
        );
    }
}
