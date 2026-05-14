package com.itda.backend.adoption.dto.response;

import com.itda.backend.adoption.domain.Adoption;
import com.itda.backend.adoption.domain.AdoptionStatus;

import java.time.LocalDateTime;

public record ApplicantResponse(
        Long adoptionId,
        Long dogId,
        ApplicantInfo applicant,
        int matchScore,
        String introduction,
        AdoptionStatus status,
        ContactInfo contactInfo,
        LocalDateTime appliedAt
) {
    public record ApplicantInfo(
            Long userId,
            String nickname,
            String housingType,
            String familyType,
            String dailyOutTime
    ) {}

    public record ContactInfo(String email) {}

    public static ApplicantResponse from(Adoption adoption) {
        ContactInfo contactInfo = adoption.getStatus() == AdoptionStatus.ACCEPTED
                ? new ContactInfo(adoption.getApplicant().getEmail())
                : null;

        String housingType = adoption.getApplicant().getLifestyle() != null
                ? adoption.getApplicant().getLifestyle().getHousingType().name() : null;

        String familyType = adoption.getApplicant().getLifestyle() != null
                ? adoption.getApplicant().getLifestyle().getFamilyType().name() : null;

        String dailyOutTime = adoption.getApplicant().getLifestyle() != null
                ? adoption.getApplicant().getLifestyle().getDailyOutTime().name() : null;

        return new ApplicantResponse(
                adoption.getId(),
                adoption.getDog().getId(),
                new ApplicantInfo(
                        adoption.getApplicant().getId(),
                        adoption.getApplicant().getNickname(),
                        housingType,
                        familyType,
                        dailyOutTime
                ),
                0, // MatchService 완성 후 연동
                adoption.getIntroduction(),
                adoption.getStatus(),
                contactInfo,
                adoption.getCreatedAt()
        );
    }
}