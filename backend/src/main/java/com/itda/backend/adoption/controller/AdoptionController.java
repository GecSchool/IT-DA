package com.itda.backend.adoption.controller;

import com.itda.backend.adoption.dto.request.AdoptionRequest;
import com.itda.backend.adoption.dto.request.AdoptionStatusRequest;
import com.itda.backend.adoption.dto.request.AdoptionUpdateRequest;
import com.itda.backend.adoption.dto.response.AdoptionResponse;
import com.itda.backend.adoption.dto.response.ApplicantResponse;
import com.itda.backend.adoption.service.AdoptionService;
import com.itda.backend.global.resolver.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/adoptions")
@RequiredArgsConstructor
public class AdoptionController {

    private final AdoptionService adoptionService;

    @PostMapping
    public Map<String, Long> apply(@AuthUser Long userId,
                                   @RequestBody AdoptionRequest request) {
        Long adoptionId = adoptionService.apply(userId, request);
        return Map.of("adoptionId", adoptionId);
    }

    @PutMapping("/{adoptionId}")
    public void update(@PathVariable Long adoptionId,
                       @AuthUser Long userId,
                       @RequestBody AdoptionUpdateRequest request) {
        adoptionService.update(adoptionId, userId, request);
    }

    @DeleteMapping("/{adoptionId}")
    public void delete(@PathVariable Long adoptionId,
                       @AuthUser Long userId) {
        adoptionService.delete(adoptionId, userId);
    }

    @GetMapping("/applicants")
    public List<ApplicantResponse> getApplicants(@AuthUser Long userId) {
        return adoptionService.getApplicants(userId);
    }

    @GetMapping("/me")
    public List<AdoptionResponse> getMyAdoptions(@AuthUser Long userId) {
        return adoptionService.getMyAdoptions(userId);
    }

    @PatchMapping("/{adoptionId}/status")
    public void updateStatus(@PathVariable Long adoptionId,
                             @AuthUser Long userId,
                             @RequestBody AdoptionStatusRequest request) {
        adoptionService.updateStatus(adoptionId, userId, request);
    }
}
