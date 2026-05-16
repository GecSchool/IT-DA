package com.itda.backend.post.repository;

import com.itda.backend.post.domain.Post;
import com.itda.backend.post.domain.PostLike;
import com.itda.backend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findByUserAndPost(User user, Post post);
    boolean existsByUserAndPost(User user, Post post);
    int countByPost(Post post);
}