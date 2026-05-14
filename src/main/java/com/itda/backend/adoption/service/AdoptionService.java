package com.itda.backend.adoption.service;

import com.itda.backend.adoption.domain.Adoption;
import com.itda.backend.adoption.domain.AdoptionStatus;
import com.itda.backend.adoption.dto.request.AdoptionRequest;
import com.itda.backend.adoption.dto.request.AdoptionStatusRequest;
import com.itda.backend.adoption.dto.request.AdoptionUpdateRequest;
import com.itda.backend.adoption.dto.response.AdoptionResponse;
import com.itda.backend.adoption.dto.response.ApplicantResponse;
import com.itda.backend.adoption.repository.AdoptionRepository;
import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.service.DogService;
import com.itda.backend.global.exception.BusinessException;
import com.itda.backend.global.exception.ErrorCode;
import com.itda.backend.user.domain.User;
import com.itda.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdoptionService {

    private final AdoptionRepository adoptionRepository;
    private final UserService userService;
    private final DogService dogService;

    @Transactional
    public Long apply(Long userId, AdoptionRequest request) {
        User applicant = userService.getById(userId);
        Dog dog = dogService.getById(request.dogId());

        if (dog.getFoster().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.SELF_ADOPTION);
        }

        if (adoptionRepository.existsByApplicantIdAndDogId(userId, request.dogId())) {
            throw new BusinessException(ErrorCode.DUPLICATE_ADOPTION);
        }
        Adoption adoption = Adoption.builder()
                .applicant(applicant)
                .dog(dog)
                .introduction(request.introduction())
                .build();
        return adoptionRepository.save(adoption).getId();
    }

    @Transactional
    public void update(Long adoptionId, Long userId, AdoptionUpdateRequest request) {
        Adoption adoption = getById(adoptionId);
        validateApplicant(adoption, userId);
        adoption.updateIntroduction(request.introduction());
    }

    @Transactional
    public void delete(Long adoptionId, Long userId) {
        Adoption adoption = getById(adoptionId);
        validateApplicant(adoption, userId);
        adoptionRepository.delete(adoption);
    }

    // MatchScoreCalculator 완성 후 matchScore 계산 로직 추가
    public List<ApplicantResponse> getApplicants(Long userId) {
        return adoptionRepository.findByDogFosterIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(ApplicantResponse::from)
                .toList();
    }

    public List<AdoptionResponse> getMyAdoptions(Long userId) {
        return adoptionRepository.findByApplicantIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(AdoptionResponse::from)
                .toList();
    }

    @Transactional
    public void updateStatus(Long adoptionId, Long userId, AdoptionStatusRequest request) {
        Adoption adoption = getById(adoptionId);
        validateFoster(adoption, userId);
        validateStatusTransition(adoption.getStatus(), request.status());

        if (request.status() == AdoptionStatus.ACCEPTED
                && adoption.getStatus() != AdoptionStatus.ACCEPTED
                && adoptionRepository.existsByDogIdAndStatus(adoption.getDog().getId(), AdoptionStatus.ACCEPTED)) {
            throw new BusinessException(ErrorCode.INVALID_INPUT);
        }

        adoption.updateStatus(request.status());
    }

    private Adoption getById(Long adoptionId) {
        return adoptionRepository.findById(adoptionId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ADOPTION_NOT_FOUND));
    }

    private void validateApplicant(Adoption adoption, Long userId) {
        if (!adoption.getApplicant().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }
    }

    private void validateFoster(Adoption adoption, Long userId) {
        if (!adoption.getDog().getFoster().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }
    }

    private void validateStatusTransition(AdoptionStatus current, AdoptionStatus next) {
        if (next == null) {
            throw new BusinessException(ErrorCode.INVALID_INPUT);
        }

        if (current == AdoptionStatus.PENDING) {
            if (next != AdoptionStatus.ACCEPTED && next != AdoptionStatus.REJECTED) {
                throw new BusinessException(ErrorCode.INVALID_INPUT);
            }
            return;
        }

        if (current == AdoptionStatus.ACCEPTED) {
            if (next != AdoptionStatus.COMPLETE) {
                throw new BusinessException(ErrorCode.INVALID_INPUT);
            }
            return;
        }

        throw new BusinessException(ErrorCode.INVALID_INPUT);
    }
}
