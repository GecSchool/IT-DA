package com.itda.backend.post.controller;

import com.itda.backend.global.resolver.AuthUser;
import com.itda.backend.post.dto.request.CommentRequest;
import com.itda.backend.post.dto.request.PostRequest;
import com.itda.backend.post.dto.response.CommentResponse;
import com.itda.backend.post.dto.response.PostDetailResponse;
import com.itda.backend.post.dto.response.PostSummaryResponse;
import com.itda.backend.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/dogs/{dogId}/posts")
    public List<PostSummaryResponse> getPostsByDog(@PathVariable Long dogId) {
        return postService.getPostsByDog(dogId);
    }

    @PostMapping("/posts")
    public Map<String, Long> createPost(@AuthUser Long userId,
                                        @RequestBody PostRequest request) {
        Long postId = postService.createPost(userId, request);
        return Map.of("postId", postId);
    }

    @GetMapping("/posts")
    public List<PostSummaryResponse> getFeed() {
        return postService.getFeed();
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
    public Map<String, Long> createComment(@PathVariable Long postId,
                                           @AuthUser Long userId,
                                           @RequestBody CommentRequest request) {
        Long commentId = postService.createComment(postId, userId, request);
        return Map.of("commentId", commentId);
    }

    @GetMapping("/posts/{postId}/comments")
    public List<CommentResponse> getComments(@PathVariable Long postId) {
        return postService.getComments(postId);
    }

    @DeleteMapping("/posts/{postId}/comments/{commentId}")
    public void deleteComment(@PathVariable Long postId,
                              @PathVariable Long commentId,
                              @AuthUser Long userId) {
        postService.deleteComment(postId, commentId, userId);
    }
}