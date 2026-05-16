package com.itda.backend.post.dto.response;

import com.itda.backend.post.domain.Post;

import java.time.LocalDateTime;

public record PostSummaryResponse(
        Long postId,
        AuthorInfo author,
        DogInfo dog,
        String thumbnailUrl,
        String caption,
        int likeCount,
        int commentCount,
        LocalDateTime createdAt
) {
    public record AuthorInfo(Long userId, String nickname) {}
    public record DogInfo(Long dogId, String name) {}

    public static PostSummaryResponse from(Post post) {
        String thumbnailUrl = post.getImages().isEmpty() ? null
                : post.getImages().get(0).getImageUrl();
        return new PostSummaryResponse(
                post.getId(),
                new AuthorInfo(post.getAuthor().getId(), post.getAuthor().getNickname()),
                new DogInfo(post.getDog().getId(), post.getDog().getName()),
                thumbnailUrl,
                post.getCaption(),
                post.getLikes().size(),
                post.getComments().size(),
                post.getCreatedAt()
        );
    }
}