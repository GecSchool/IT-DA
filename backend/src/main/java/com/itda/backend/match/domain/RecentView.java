package com.itda.backend.match.domain;

import com.itda.backend.dog.domain.Dog;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "recent_views",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "dog_id"}))
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecentView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dog_id", nullable = false)
    private Dog dog;

    @Column(nullable = false)
    private LocalDateTime viewedAt;

    @Builder
    public RecentView(Long userId, Dog dog) {
        this.userId = userId;
        this.dog = dog;
        this.viewedAt = LocalDateTime.now();
    }

    public void refresh() {
        this.viewedAt = LocalDateTime.now();
    }
}
