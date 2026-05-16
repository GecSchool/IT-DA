package com.itda.backend.match.domain;

import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.domain.Size;
import com.itda.backend.user.domain.*;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 점수 구성 (100점 만점):
 * - 선호 크기 일치  30점
 * - 트레이트 겹침   30점
 * - 주거 환경 적합  20점
 * - 가족 구성 적합  10점
 * - 반려동물 공존   10점
 */
@Component
public class MatchScoreCalculator {

    public int calculate(User user, Dog dog) {
        Lifestyle lifestyle = user.getLifestyle();
        if (lifestyle == null) return 0;

        int score = 0;
        score += sizeScore(lifestyle.getPreferredSize(), dog.getSize());
        score += traitScore(lifestyle.getPreferredTraits(), dog.getTraits());
        score += housingScore(lifestyle.getHousingType(), dog.getCanLiveInApartment());
        score += familyScore(lifestyle.getFamilyType(), dog.getCanLiveWithChild());
        score += petScore(lifestyle.getHasPet(), dog.getCanLiveWithDog(), dog.getCanLiveWithCat());
        return score;
    }

    private int sizeScore(PreferredSize preferred, Size dogSize) {
        if (preferred == null || dogSize == null) return 0;
        if (preferred == PreferredSize.ANY) return 30;
        return preferred.name().equals(dogSize.name()) ? 30 : 0;
    }

    private int traitScore(List<Trait> preferred, List<Trait> dogTraits) {
        if (preferred == null || preferred.isEmpty() || dogTraits == null || dogTraits.isEmpty()) return 0;
        long matched = preferred.stream().filter(dogTraits::contains).count();
        return (int) Math.round((double) matched / preferred.size() * 30);
    }

    private int housingScore(HousingType housingType, Boolean canLiveInApartment) {
        if (housingType == null) return 0;
        if (housingType == HousingType.APARTMENT) {
            return Boolean.TRUE.equals(canLiveInApartment) ? 20 : 0;
        }
        return 20;
    }

    private int familyScore(FamilyType familyType, Boolean canLiveWithChild) {
        if (familyType == null) return 0;
        if (familyType == FamilyType.WITH_CHILD) {
            return Boolean.TRUE.equals(canLiveWithChild) ? 10 : 0;
        }
        return 10;
    }

    private int petScore(HasPet hasPet, Boolean canLiveWithDog, Boolean canLiveWithCat) {
        if (hasPet == null) return 0;
        return switch (hasPet) {
            case DOG -> Boolean.TRUE.equals(canLiveWithDog) ? 10 : 0;
            case CAT -> Boolean.TRUE.equals(canLiveWithCat) ? 10 : 0;
            case NONE -> 10;
        };
    }
}
