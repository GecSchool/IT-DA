package com.itda.backend.match.dto;

import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.domain.DogImage;
import com.itda.backend.match.domain.MatchScoreCalculator.MatchResult;
import com.itda.backend.post.domain.Post;
import com.itda.backend.post.domain.PostImage;
import com.itda.backend.user.domain.Trait;

import java.util.List;

public record MatchRecommendationResponse(
        Long dogId,
        String name,
        String breed,
        String gender,
        String regionSido,
        String size,
        Double weight,
        List<String> traits,
        String walkAmount,
        Boolean isToiletTrained,
        String barkingLevel,
        Boolean canLiveInApartment,
        Boolean canLiveWithChild,
        Boolean canLiveWithDog,
        Boolean canLiveWithCat,
        String fosterNote,
        List<String> imageUrls,
        int matchScore,
        List<String> matchReasons,
        List<String> cautionReasons,
        List<PostThumbnail> posts
) {
    public record PostThumbnail(Long postId, String thumbnailUrl) {}

    public static MatchRecommendationResponse of(Dog dog, MatchResult result, List<Post> recentPosts) {
        List<String> imageUrls = dog.getImages().stream()
                .map(DogImage::getImageUrl)
                .toList();

        List<String> traits = dog.getTraits().stream()
                .map(Trait::name)
                .toList();

        List<PostThumbnail> postThumbnails = recentPosts.stream()
                .map(post -> {
                    String thumbnailUrl = post.getImages().isEmpty()
                            ? null
                            : post.getImages().get(0).getImageUrl();
                    return new PostThumbnail(post.getId(), thumbnailUrl);
                })
                .toList();

        return new MatchRecommendationResponse(
                dog.getId(),
                dog.getName(),
                dog.getBreed(),
                dog.getGender() != null ? dog.getGender().name() : null,
                dog.getRegionSido(),
                dog.getSize() != null ? dog.getSize().name() : null,
                dog.getWeight(),
                traits,
                dog.getWalkAmount() != null ? dog.getWalkAmount().name() : null,
                dog.getIsToiletTrained(),
                dog.getBarkingLevel() != null ? dog.getBarkingLevel().name() : null,
                dog.getCanLiveInApartment(),
                dog.getCanLiveWithChild(),
                dog.getCanLiveWithDog(),
                dog.getCanLiveWithCat(),
                dog.getFosterNote(),
                imageUrls,
                result.score(),
                result.matchReasons(),
                result.cautionReasons(),
                postThumbnails
        );
    }
}
