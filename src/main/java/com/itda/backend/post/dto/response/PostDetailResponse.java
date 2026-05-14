package com.itda.backend.post.dto.response;

import com.itda.backend.dog.domain.DogStatus;
import com.itda.backend.post.domain.Post;

import java.time.LocalDateTime;
import java.util.List;

public record PostDetailResponse(
        Long postId,
        AuthorInfo author,
        DogInfo dog,
        List<String> imageUrls,
        String caption,
        int likeCount,
        boolean isLiked,
        int commentCount,
        LocalDateTime createdAt
) {
    public record AuthorInfo(Long userId, String nickname) {}
    public record DogInfo(Long dogId, String name, DogStatus status) {}

    public static PostDetailResponse from(Post post, boolean isLiked) {
        List<String> imageUrls = post.getImages().stream()
                .map(image -> image.getImageUrl())
                .toList();

        return new PostDetailResponse(
                post.getId(),
                new AuthorInfo(post.getAuthor().getId(), post.getAuthor().getNickname()),
                new DogInfo(post.getDog().getId(), post.getDog().getName(), post.getDog().getStatus()),
                imageUrls,
                post.getCaption(),
                post.getLikes().size(),
                isLiked,
                post.getComments().size(),
                post.getCreatedAt()
        );
    }
}