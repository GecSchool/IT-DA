package com.itda.backend.post.controller;

import com.itda.backend.global.resolver.AuthUser;
import com.itda.backend.post.dto.request.CommentRequest;
import com.itda.backend.post.dto.request.PostRequest;
import com.itda.backend.post.dto.response.CommentResponse;
import com.itda.backend.post.dto.response.PostDetailResponse;
import com.itda.backend.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.itda.backend.post.dto.response.CommentPageResponse;
import com.itda.backend.post.dto.response.CommentCreateResponse;
import com.itda.backend.post.dto.response.PostPageResponse;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/dogs/{dogId}/posts")
    public PostPageResponse getPostsByDog(
            @PathVariable Long dogId,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "10") int limit) {
        return postService.getPostsByDog(dogId, cursor, limit);
    }

    @PostMapping("/posts")
    public Map<String, Long> createPost(@AuthUser Long userId,
                                        @RequestBody PostRequest request) {
        Long postId = postService.createPost(userId, request);
        return Map.of("postId", postId);
    }

    @GetMapping("/posts")
    public PostPageResponse getFeed(
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "10") int limit) {
        return postService.getFeed(cursor, limit);
    }

    @GetMapping("/posts/{postId}")
    public PostDetailResponse getPost(@PathVariable Long postId,
                                      @AuthUser Long userId) {
        return postService.getPost(postId, userId);
    }

    @PutMapping("/posts/{postId}")
    public void updatePost(@PathVariable Long postId,
                           @AuthUser Long userId,
                           @RequestBody PostRequest request) {
        postService.updatePost(postId, userId, request);
    }

    @DeleteMapping("/posts/{postId}")
    public void deletePost(@PathVariable Long postId,
                           @AuthUser Long userId) {
        postService.deletePost(postId, userId);
    }

    @PostMapping("/posts/{postId}/like")
    public Map<String, Object> toggleLike(@PathVariable Long postId,
                                          @AuthUser Long userId) {
        return postService.toggleLike(postId, userId);
    }

    @PostMapping("/posts/{postId}/comments")
    public CommentCreateResponse createComment(@PathVariable Long postId,
                                               @AuthUser Long userId,
                                               @RequestBody CommentRequest request) {
        return postService.createComment(postId, userId, request);
    }

    @GetMapping("/posts/{postId}/comments")
    public CommentPageResponse getComments(
            @PathVariable Long postId,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "20") int limit) {
        return postService.getComments(postId, cursor, limit);
    }

    @DeleteMapping("/posts/{postId}/comments/{commentId}")
    public void deleteComment(@PathVariable Long postId,
                              @PathVariable Long commentId,
                              @AuthUser Long userId) {
        postService.deleteComment(postId, commentId, userId);
    }
}