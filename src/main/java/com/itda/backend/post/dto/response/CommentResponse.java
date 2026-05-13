package com.itda.backend.post.dto.response;

import com.itda.backend.post.domain.Comment;

import java.time.LocalDateTime;
import java.util.List;

public record CommentResponse(
        Long commentId,
        Long parentId,
        Long authorId,
        String authorNickname,
        String content,
        LocalDateTime createdAt,
        List<CommentResponse> replies
) {
    public static CommentResponse from(Comment comment) {
        List<CommentResponse> replies = comment.getReplies().stream()
                .map(CommentResponse::from)
                .toList();
        return new CommentResponse(
                comment.getId(),
                comment.getParent() != null ? comment.getParent().getId() : null,
                comment.getAuthor().getId(),
                comment.getAuthor().getNickname(),
                comment.getContent(),
                comment.getCreatedAt(),
                replies
        );
    }
}