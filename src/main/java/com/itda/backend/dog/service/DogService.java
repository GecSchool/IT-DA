package com.itda.backend.dog.service;

import com.itda.backend.adoption.repository.AdoptionRepository;
import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.domain.DogImage;
import com.itda.backend.dog.dto.request.DogRequest;
import com.itda.backend.dog.dto.response.DogDetailResponse;
import com.itda.backend.dog.dto.response.DogSummaryResponse;
import com.itda.backend.dog.repository.DogRepository;
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
public class DogService {

    private final DogRepository dogRepository;
    private final UserService userService;
    private final AdoptionRepository adoptionRepository;

    @Transactional
    public Long register(Long userId, DogRequest request) {
        validateDuplicateImageUrls(request.imageUrls());
        User foster = userService.getById(userId);
        Dog dog = request.toEntity(foster);
        updateImages(dog, request.imageUrls());
        return dogRepository.save(dog).getId();
    }

    public List<DogSummaryResponse> getMyDogs(Long userId) {
        return dogRepository.findAllByFosterIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(dog -> DogSummaryResponse.from(dog, adoptionRepository.countByDogId(dog.getId())))
                .toList();
    }

    public List<DogSummaryResponse> getRecentDogs(int limit) {
        return dogRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .limit(limit)
                .map(dog -> DogSummaryResponse.from(dog, adoptionRepository.countByDogId(dog.getId())))
                .toList();
    }

    public DogDetailResponse getDetail(Long dogId, Long userId) {
        Dog dog = getById(dogId);
        boolean isMine = userId != null && dog.getFoster().getId().equals(userId);
        int applicationCount = adoptionRepository.countByDogId(dogId);
        return DogDetailResponse.from(dog, isMine, applicationCount);
    }

    @Transactional
    public void update(Long dogId, Long userId, DogRequest request) {
        validateDuplicateImageUrls(request.imageUrls());
        Dog dog = getById(dogId);
        validateOwner(dog, userId);
        dog.update(request.name(), request.gender(), request.breed(),
                request.regionSido(), request.regionSigungu(), request.weight(),
                request.traits(), request.walkAmount(), request.isToiletTrained(),
                request.barkingLevel(), request.isSeparationAnxiety(),
                request.canLiveInApartment(), request.canLiveWithChild(),
                request.canLiveWithDog(), request.canLiveWithCat(),
                request.isNeutered(), request.isVaccinated(),
                request.hasDisease(), request.diseaseDescription(), request.fosterNote());
        updateImages(dog, request.imageUrls());
    }

    @Transactional
    public void complete(Long dogId, Long userId) {
        Dog dog = getById(dogId);
        validateOwner(dog, userId);
        dog.complete();
    }

    @Transactional
    public void delete(Long dogId, Long userId) {
        Dog dog = getById(dogId);
        validateOwner(dog, userId);
        dogRepository.delete(dog);
    }

    public Dog getById(Long dogId) {
        return dogRepository.findById(dogId)
                .orElseThrow(() -> new BusinessException(ErrorCode.DOG_NOT_FOUND));
    }

    private void validateOwner(Dog dog, Long userId) {
        if (!dog.getFoster().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }
    }

    private void updateImages(Dog dog, List<String> imageUrls) {
        dog.getImages().clear();
        if (imageUrls != null) {
            for (int i = 0; i < imageUrls.size(); i++) {
                dog.getImages().add(DogImage.builder()
                        .dog(dog)
                        .imageUrl(imageUrls.get(i))
                        .sortOrder(i)
                        .build());
            }
        }
    }

    private void validateDuplicateImageUrls(List<String> imageUrls) {
        if (imageUrls == null) return;
        if (imageUrls.size() != imageUrls.stream().distinct().count()) {
            throw new BusinessException(ErrorCode.DUPLICATE_IMAGE_URL);
        }
    }

}