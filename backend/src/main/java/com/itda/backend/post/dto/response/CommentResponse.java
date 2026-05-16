package com.itda.backend.post.dto.response;

import com.itda.backend.post.domain.Comment;

import java.time.LocalDateTime;
import java.util.List;

public record CommentResponse(
        Long commentId,
        Long parentId,
        AuthorInfo author,
        String content,
        LocalDateTime createdAt,
        List<CommentResponse> replies
) {
    public record AuthorInfo(Long userId, String nickname) {}

    public static CommentResponse from(Comment comment) {
        List<CommentResponse> replies = comment.getReplies().stream()
                .map(CommentResponse::from)
                .toList();
        return new CommentResponse(
                comment.getId(),
                comment.getParent() != null ? comment.getParent().getId() : null,
                new AuthorInfo(comment.getAuthor().getId(), comment.getAuthor().getNickname()),
                comment.getContent(),
                comment.getCreatedAt(),
                replies
        );
    }
}