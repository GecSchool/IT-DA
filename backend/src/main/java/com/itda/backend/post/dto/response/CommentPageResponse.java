package com.itda.backend.post.dto.response;

import java.util.List;

public record CommentPageResponse(
        List<CommentResponse> comments,
        Long nextCursor
) {
    public static CommentPageResponse of(List<CommentResponse> items, int limit) {
        boolean hasNext = items.size() > limit;
        List<CommentResponse> pageItems = hasNext ? items.subList(0, limit) : items;
        Long nextCursor = hasNext ? pageItems.get(pageItems.size() - 1).commentId() : null;
        return new CommentPageResponse(pageItems, nextCursor);
    }
}