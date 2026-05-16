package com.itda.backend.adoption.dto.request;

import com.itda.backend.adoption.domain.AdoptionStatus;

public record AdoptionStatusRequest(
        AdoptionStatus status
) {
}
