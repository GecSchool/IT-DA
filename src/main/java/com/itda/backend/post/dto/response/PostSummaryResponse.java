package com.itda.backend.post.dto.response;

import com.itda.backend.post.domain.Post;

import java.time.LocalDateTime;

public record PostSummaryResponse(
        Long postId,
        String thumbnailUrl,
        String caption,
        int likeCount,
        int commentCount,
        LocalDateTime createdAt
) {
    public static PostSummaryResponse from(Post post) {
        String thumbnailUrl = post.getImages().isEmpty() ? null
                : post.getImages().get(0).getImageUrl();
        return new PostSummaryResponse(
                post.getId(),
                thumbnailUrl,
                post.getCaption(),
                post.getLikes().size(),
                post.getComments().size(),
                post.getCreatedAt()
        );
    }
}