package com.itda.backend.adoption.dto.request;

public record AdoptionRequest(
        Long dogId,
        String introduction
) {
}
