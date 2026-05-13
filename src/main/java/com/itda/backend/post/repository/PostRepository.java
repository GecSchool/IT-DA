package com.itda.backend.post.repository;

import com.itda.backend.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByDogIdOrderByCreatedAtDesc(Long dogId);
    List<Post> findAllByOrderByCreatedAtDesc();
}
