package com.itda.backend.post.service;

import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.service.DogService;
import com.itda.backend.global.exception.BusinessException;
import com.itda.backend.global.exception.ErrorCode;
import com.itda.backend.post.domain.Comment;
import com.itda.backend.post.domain.Post;
import com.itda.backend.post.domain.PostImage;
import com.itda.backend.post.domain.PostLike;
import com.itda.backend.post.dto.request.CommentRequest;
import com.itda.backend.post.dto.request.PostRequest;
import com.itda.backend.post.dto.response.CommentResponse;
import com.itda.backend.post.dto.response.PostDetailResponse;
import com.itda.backend.post.dto.response.PostSummaryResponse;
import com.itda.backend.post.repository.CommentRepository;
import com.itda.backend.post.repository.PostLikeRepository;
import com.itda.backend.post.repository.PostRepository;
import com.itda.backend.user.domain.User;
import com.itda.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final CommentRepository commentRepository;
    private final UserService userService;
    private final DogService dogService;

    @Transactional
    public Long createPost(Long userId, PostRequest request) {
        validateDuplicateImageUrls(request.imageUrls());
        User author = userService.getById(userId);
        Dog dog = dogService.getById(request.dogId());


        if (!dog.getFoster().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }


        Post post = Post.builder()
                .author(author)
                .dog(dog)
                .caption(request.caption())
                .build();
        updateImages(post, request.imageUrls());
        return postRepository.save(post).getId();
    }

    public List<PostSummaryResponse> getPostsByDog(Long dogId) {
        return postRepository.findByDogIdOrderByCreatedAtDesc(dogId)
                .stream()
                .map(PostSummaryResponse::from)
                .toList();
    }

    public List<PostSummaryResponse> getFeed() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PostSummaryResponse::from)
                .toList();
    }

    public PostDetailResponse getPost(Long postId, Long userId) {
        Post post = getById(postId);
        boolean isLiked = false;
        if (userId != null) {
            User user = userService.getById(userId);
            isLiked = postLikeRepository.existsByUserAndPost(user, post);
        }
        return PostDetailResponse.from(post, isLiked);
    }

    @Transactional
    public void updatePost(Long postId, Long userId, PostRequest request) {
        validateDuplicateImageUrls(request.imageUrls());
        Post post = getById(postId);
        validateAuthor(post, userId);
        post.update(request.caption());
        updateImages(post, request.imageUrls());
    }

    @Transactional
    public void deletePost(Long postId, Long userId) {
        Post post = getById(postId);
        validateAuthor(post, userId);
        postRepository.delete(post);
    }

    @Transactional
    public Map<String, Object> toggleLike(Long postId, Long userId) {
        Post post = getById(postId);
        User user = userService.getById(userId);
        postLikeRepository.findByUserAndPost(user, post)
                .ifPresentOrElse(
                        postLikeRepository::delete,
                        () -> postLikeRepository.save(PostLike.builder()
                                .user(user)
                                .post(post)
                                .build())
                );
        boolean isLiked = postLikeRepository.existsByUserAndPost(user, post);
        int likeCount = postLikeRepository.countByPost(post);
        return Map.of("isLiked", isLiked, "likeCount", likeCount);
    }

    @Transactional
    public Long createComment(Long postId, Long userId, CommentRequest request) {
        Post post = getById(postId);
        User author = userService.getById(userId);
        Comment parent = null;
        if (request.parentId() != null) {
            parent = commentRepository.findById(request.parentId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND));

            if (!parent.getPost().getId().equals(postId)) {
                throw new BusinessException(ErrorCode.INVALID_INPUT);
            }
        }
        Comment comment = Comment.builder()
                .author(author)
                .post(post)
                .parent(parent)
                .content(request.content())
                .build();
        return commentRepository.save(comment).getId();
    }

    public List<CommentResponse> getComments(Long postId) {
        return commentRepository.findByPostIdAndParentIsNullOrderByCreatedAtAsc(postId)
                .stream()
                .map(CommentResponse::from)
                .toList();
    }

    @Transactional
    public void deleteComment(Long postId, Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND));

        if (!comment.getPost().getId().equals(postId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }

        if (!comment.getAuthor().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }
        commentRepository.delete(comment);
    }

    public Post getById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new BusinessException(ErrorCode.POST_NOT_FOUND));
    }

    private void validateAuthor(Post post, Long userId) {
        if (!post.getAuthor().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }
    }

    private void updateImages(Post post, List<String> imageUrls) {
        post.getImages().clear();
        if (imageUrls != null) {
            for (int i = 0; i < imageUrls.size(); i++) {
                post.getImages().add(PostImage.builder()
                        .post(post)
                        .imageUrl(imageUrls.get(i))
                        .sortOrder(i)
                        .build());
            }
        }
    }
    private void validateDuplicateImageUrls(List<String> imageUrls) {
        if (imageUrls == null) return;
        if (imageUrls.size() != imageUrls.stream().distinct().count()) {
            throw new BusinessException(ErrorCode.DUPLICATE_IMAGE_URL);
        }
    }
}