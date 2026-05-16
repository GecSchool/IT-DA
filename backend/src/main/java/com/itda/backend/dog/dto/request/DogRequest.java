package com.itda.backend.dog.dto.request;

import com.itda.backend.dog.domain.*;
import com.itda.backend.user.domain.Trait;
import com.itda.backend.user.domain.User;

import java.util.List;

public record DogRequest(
        String name,
        Gender gender,
        String breed,
        String regionSido,
        String regionSigungu,
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
        List<String> imageUrls
) {
    public Dog toEntity(User foster) {
        return Dog.builder()
                .foster(foster)
                .name(name)
                .gender(gender)
                .breed(breed)
                .regionSido(regionSido)
                .regionSigungu(regionSigungu)
                .weight(weight)
                .traits(traits)
                .walkAmount(walkAmount)
                .isToiletTrained(isToiletTrained)
                .barkingLevel(barkingLevel)
                .isSeparationAnxiety(isSeparationAnxiety)
                .canLiveInApartment(canLiveInApartment)
                .canLiveWithChild(canLiveWithChild)
                .canLiveWithDog(canLiveWithDog)
                .canLiveWithCat(canLiveWithCat)
                .isNeutered(isNeutered)
                .isVaccinated(isVaccinated)
                .hasDisease(hasDisease)
                .diseaseDescription(diseaseDescription)
                .fosterNote(fosterNote)
                .build();
    }
}
