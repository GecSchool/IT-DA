package com.itda.backend.dog.domain;

import com.itda.backend.global.common.BaseTimeEntity;
import com.itda.backend.user.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "dogs")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dog extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foster_user_id", nullable = false)
    private User foster;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String breed;

    private String regionSido;
    private String regionSigungu;

    @Enumerated(EnumType.STRING)
    private Size size;

    private Double weight;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "dog_traits", joinColumns = @JoinColumn(name = "dog_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "trait")
    private List<com.itda.backend.user.domain.Trait> traits = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private WalkAmount walkAmount;

    private Boolean isToiletTrained;

    @Enumerated(EnumType.STRING)
    private BarkingLevel barkingLevel;

    private Boolean isSeparationAnxiety;
    private Boolean canLiveInApartment;
    private Boolean canLiveWithChild;
    private Boolean canLiveWithDog;
    private Boolean canLiveWithCat;
    private Boolean isNeutered;
    private Boolean isVaccinated;
    private Boolean hasDisease;
    private String diseaseDescription;
    private String fosterNote;

    @Enumerated(EnumType.STRING)
    private DogStatus status;

    @OneToMany(mappedBy = "dog", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("sortOrder ASC")
    private List<DogImage> images = new ArrayList<>();

    @Builder
    public Dog(User foster, String name, Gender gender, String breed,
               String regionSido, String regionSigungu, Double weight,
               List<com.itda.backend.user.domain.Trait> traits,
               WalkAmount walkAmount, Boolean isToiletTrained,
               BarkingLevel barkingLevel, Boolean isSeparationAnxiety,
               Boolean canLiveInApartment, Boolean canLiveWithChild,
               Boolean canLiveWithDog, Boolean canLiveWithCat,
               Boolean isNeutered, Boolean isVaccinated,
               Boolean hasDisease, String diseaseDescription, String fosterNote) {
        this.foster = foster;
        this.name = name;
        this.gender = gender;
        this.breed = breed;
        this.regionSido = regionSido;
        this.regionSigungu = regionSigungu;
        this.weight = weight;
        this.size = DogSizeCalculator.calculate(weight);
        this.traits = traits != null ? traits : new ArrayList<>();
        this.walkAmount = walkAmount;
        this.isToiletTrained = isToiletTrained;
        this.barkingLevel = barkingLevel;
        this.isSeparationAnxiety = isSeparationAnxiety;
        this.canLiveInApartment = canLiveInApartment;
        this.canLiveWithChild = canLiveWithChild;
        this.canLiveWithDog = canLiveWithDog;
        this.canLiveWithCat = canLiveWithCat;
        this.isNeutered = isNeutered;
        this.isVaccinated = isVaccinated;
        this.hasDisease = hasDisease;
        this.diseaseDescription = diseaseDescription;
        this.fosterNote = fosterNote;
        this.status = DogStatus.AVAILABLE;
    }

    public void update(String name, Gender gender, String breed,
                       String regionSido, String regionSigungu, Double weight,
                       List<com.itda.backend.user.domain.Trait> traits,
                       WalkAmount walkAmount, Boolean isToiletTrained,
                       BarkingLevel barkingLevel, Boolean isSeparationAnxiety,
                       Boolean canLiveInApartment, Boolean canLiveWithChild,
                       Boolean canLiveWithDog, Boolean canLiveWithCat,
                       Boolean isNeutered, Boolean isVaccinated,
                       Boolean hasDisease, String diseaseDescription, String fosterNote) {
        this.name = name;
        this.gender = gender;
        this.breed = breed;
        this.regionSido = regionSido;
        this.regionSigungu = regionSigungu;
        this.weight = weight;
        this.size = DogSizeCalculator.calculate(weight);
        this.traits = traits != null ? traits : new ArrayList<>();
        this.walkAmount = walkAmount;
        this.isToiletTrained = isToiletTrained;
        this.barkingLevel = barkingLevel;
        this.isSeparationAnxiety = isSeparationAnxiety;
        this.canLiveInApartment = canLiveInApartment;
        this.canLiveWithChild = canLiveWithChild;
        this.canLiveWithDog = canLiveWithDog;
        this.canLiveWithCat = canLiveWithCat;
        this.isNeutered = isNeutered;
        this.isVaccinated = isVaccinated;
        this.hasDisease = hasDisease;
        this.diseaseDescription = diseaseDescription;
        this.fosterNote = fosterNote;
    }

    public void complete() {
        this.status = DogStatus.ADOPTED;
    }
}
