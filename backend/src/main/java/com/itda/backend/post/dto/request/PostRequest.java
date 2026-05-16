package com.itda.backend.post.dto.request;

import java.util.List;

public record PostRequest(
        Long dogId,
        String caption,
        List<String> imageUrls
) {
}
