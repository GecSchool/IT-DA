package com.itda.backend.post.dto.response;

import java.util.List;

public record PostPageResponse(
        List<PostSummaryResponse> posts,
        Long nextCursor
) {
    public static PostPageResponse of(List<PostSummaryResponse> items, int limit) {
        boolean hasNext = items.size() > limit;
        List<PostSummaryResponse> pageItems = hasNext ? items.subList(0, limit) : items;
        Long nextCursor = hasNext ? pageItems.get(pageItems.size() - 1).postId() : null;
        return new PostPageResponse(pageItems, nextCursor);
    }
}
