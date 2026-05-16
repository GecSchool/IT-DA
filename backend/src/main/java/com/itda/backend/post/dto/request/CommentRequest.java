package com.itda.backend.post.dto.request;

public record CommentRequest(
        String content,
        Long parentId
) {
}