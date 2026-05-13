package com.itda.backend.post.repository;

import com.itda.backend.post.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdAndParentIsNullOrderByCreatedAtAsc(Long postId);
}
