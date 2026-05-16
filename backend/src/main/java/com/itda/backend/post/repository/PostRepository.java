package com.itda.backend.post.repository;

import com.itda.backend.post.domain.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE (:cursor IS NULL OR p.id < :cursor) ORDER BY p.id DESC")
    List<Post> findFeedByCursor(Long cursor, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.dog.id = :dogId AND (:cursor IS NULL OR p.id < :cursor) ORDER BY p.id DESC")
    List<Post> findByDogIdWithCursor(Long dogId, Long cursor, Pageable pageable);
}
