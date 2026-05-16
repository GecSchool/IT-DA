package com.itda.backend.match.domain;

import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.domain.Size;
import com.itda.backend.user.domain.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
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

    public record MatchResult(int score, List<String> matchReasons, List<String> cautionReasons) {}

    public MatchResult calculateResult(User user, Dog dog) {
        Lifestyle lifestyle = user.getLifestyle();
        if (lifestyle == null) return new MatchResult(0, List.of(), List.of());

        List<String> matchReasons = new ArrayList<>();
        List<String> cautionReasons = new ArrayList<>();
        int score = 0;

        int sizeScore = sizeScore(lifestyle.getPreferredSize(), dog.getSize());
        score += sizeScore;
        if (sizeScore > 0) {
            matchReasons.add("선호하는 크기와 잘 맞아요");
        } else if (lifestyle.getPreferredSize() != null && lifestyle.getPreferredSize() != PreferredSize.ANY) {
            cautionReasons.add("선호하는 크기와 다를 수 있어요");
        }

        int traitScore = traitScore(lifestyle.getPreferredTraits(), dog.getTraits());
        score += traitScore;
        if (traitScore >= 20) {
            matchReasons.add("선호하는 성격과 잘 맞아요");
        } else if (traitScore == 0 && lifestyle.getPreferredTraits() != null && !lifestyle.getPreferredTraits().isEmpty()) {
            cautionReasons.add("선호하는 성격과 차이가 있어요");
        }

        int housingScore = housingScore(lifestyle.getHousingType(), dog.getCanLiveInApartment());
        score += housingScore;
        if (housingScore > 0 && lifestyle.getHousingType() == HousingType.APARTMENT) {
            matchReasons.add("아파트 생활이 가능해요");
        } else if (housingScore == 0 && lifestyle.getHousingType() == HousingType.APARTMENT) {
            cautionReasons.add("아파트 생활이 어려울 수 있어요");
        }

        int familyScore = familyScore(lifestyle.getFamilyType(), dog.getCanLiveWithChild());
        score += familyScore;
        if (familyScore > 0 && lifestyle.getFamilyType() == FamilyType.WITH_CHILD) {
            matchReasons.add("아이와 함께 생활할 수 있어요");
        } else if (familyScore == 0 && lifestyle.getFamilyType() == FamilyType.WITH_CHILD) {
            cautionReasons.add("아이가 있는 가정이라면 주의가 필요해요");
        }

        int petScore = petScore(lifestyle.getHasPet(), dog.getCanLiveWithDog(), dog.getCanLiveWithCat());
        score += petScore;
        if (petScore > 0 && lifestyle.getHasPet() == HasPet.DOG) {
            matchReasons.add("다른 강아지와 잘 지낼 수 있어요");
        } else if (petScore > 0 && lifestyle.getHasPet() == HasPet.CAT) {
            matchReasons.add("고양이와 함께 지낼 수 있어요");
        } else if (petScore == 0 && lifestyle.getHasPet() == HasPet.DOG) {
            cautionReasons.add("다른 강아지와의 합사를 확인해주세요");
        } else if (petScore == 0 && lifestyle.getHasPet() == HasPet.CAT) {
            cautionReasons.add("고양이와의 합사를 확인해주세요");
        }

        return new MatchResult(score, matchReasons, cautionReasons);
    }

    public int calculate(User user, Dog dog) {
        return calculateResult(user, dog).score();
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
