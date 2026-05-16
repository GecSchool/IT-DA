package com.itda.backend.dog.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "dog_images")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DogImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dog_id", nullable = false)
    private Dog dog;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private Integer sortOrder;

    @Builder
    public DogImage(Dog dog, String imageUrl, Integer sortOrder) {
        this.dog = dog;
        this.imageUrl = imageUrl;
        this.sortOrder = sortOrder;
    }
}