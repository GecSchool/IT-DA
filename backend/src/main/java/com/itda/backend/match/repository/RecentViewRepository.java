package com.itda.backend.match.repository;

import com.itda.backend.match.domain.RecentView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecentViewRepository extends JpaRepository<RecentView, Long> {
    Optional<RecentView> findByUserIdAndDogId(Long userId, Long dogId);
    List<RecentView> findTop20ByUserIdOrderByViewedAtDesc(Long userId);
}
