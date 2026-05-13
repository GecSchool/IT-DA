package com.itda.backend.post.dto.response;

import com.itda.backend.post.domain.Post;

import java.time.LocalDateTime;
import java.util.List;

public record PostDetailResponse(
        Long postId,
        Long authorId,
        String authorNickname,
        Long dogId,
        String dogName,
        List<String> imageUrls,
        String caption,
        int likeCount,
        boolean isLiked,
        int commentCount,
        LocalDateTime createdAt
) {
    public static PostDetailResponse from(Post post, boolean isLiked) {
        List<String> imageUrls = post.getImages().stream()
                .map(image -> image.getImageUrl())
                .toList();
        return new PostDetailResponse(
                post.getId(),
                post.getAuthor().getId(),
                post.getAuthor().getNickname(),
                post.getDog().getId(),
                post.getDog().getName(),
                imageUrls,
                post.getCaption(),
                post.getLikes().size(),
                isLiked,
                post.getComments().size(),
                post.getCreatedAt()
        );
    }
}
