package com.itda.backend.dog.dto.response;

import com.itda.backend.adoption.domain.Adoption;
import com.itda.backend.adoption.domain.AdoptionStatus;

public record ViewerAdoptionResponse(
        Long adoptionId,
        AdoptionStatus status
) {
    public static ViewerAdoptionResponse from(Adoption adoption) {
        return new ViewerAdoptionResponse(adoption.getId(), adoption.getStatus());
    }
}