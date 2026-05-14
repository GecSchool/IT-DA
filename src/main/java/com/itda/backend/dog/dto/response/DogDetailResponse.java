package com.itda.backend.dog.dto.response;

import com.itda.backend.dog.domain.*;
import com.itda.backend.user.domain.Trait;

import java.util.List;

public record DogDetailResponse(
        Long dogId,
        boolean isMine,
        String name,
        Gender gender,
        String breed,
        String regionSido,
        String regionSigungu,
        Size size,
        Double weight,
        List<Trait> traits,
        WalkAmount walkAmount,
        Boolean isToiletTrained,
        BarkingLevel barkingLevel,
        Boolean isSeparationAnxiety,
        Boolean canLiveInApartment,
        Boolean canLiveWithChild,
        Boolean canLiveWithDog,
        Boolean canLiveWithCat,
        Boolean isNeutered,
        Boolean isVaccinated,
        Boolean hasDisease,
        String diseaseDescription,
        String fosterNote,
        List<String> imageUrls,
        DogStatus status,
        int applicationCount,
        ViewerAdoptionResponse viewerAdoption
) {
    public static DogDetailResponse from(Dog dog, boolean isMine, int applicationCount, ViewerAdoptionResponse viewerAdoption) {
        List<String> imageUrls = dog.getImages().stream()
                .map(DogImage::getImageUrl)
                .toList();
        return new DogDetailResponse(
                dog.getId(),
                isMine,
                dog.getName(),
                dog.getGender(),
                dog.getBreed(),
                dog.getRegionSido(),
                dog.getRegionSigungu(),
                dog.getSize(),
                dog.getWeight(),
                dog.getTraits(),
                dog.getWalkAmount(),
                dog.getIsToiletTrained(),
                dog.getBarkingLevel(),
                dog.getIsSeparationAnxiety(),
                dog.getCanLiveInApartment(),
                dog.getCanLiveWithChild(),
                dog.getCanLiveWithDog(),
                dog.getCanLiveWithCat(),
                dog.getIsNeutered(),
                dog.getIsVaccinated(),
                dog.getHasDisease(),
                dog.getDiseaseDescription(),
                dog.getFosterNote(),
                imageUrls,
                dog.getStatus(),
                applicationCount,
                viewerAdoption
        );
    }
}