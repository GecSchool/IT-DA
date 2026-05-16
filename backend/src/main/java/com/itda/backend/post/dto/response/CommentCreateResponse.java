package com.itda.backend.post.dto.response;

import com.itda.backend.post.domain.Comment;

import java.time.LocalDateTime;

public record CommentCreateResponse(
        Long commentId,
        Long parentId,
        String content,
        LocalDateTime createdAt
) {
    public static CommentCreateResponse from(Comment comment) {
        return new CommentCreateResponse(
                comment.getId(),
                comment.getParent() != null ? comment.getParent().getId() : null,
                comment.getContent(),
                comment.getCreatedAt()
        );
    }
}