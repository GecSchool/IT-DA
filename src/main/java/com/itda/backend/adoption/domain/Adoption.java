package com.itda.backend.adoption.domain;

import com.itda.backend.dog.domain.Dog;
import com.itda.backend.global.common.BaseTimeEntity;
import com.itda.backend.user.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "adoptions",
        uniqueConstraints = @UniqueConstraint(columnNames = {"applicant_id", "dog_id"}))
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Adoption extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id", nullable = false)
    private User applicant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dog_id", nullable = false)
    private Dog dog;

    @Column(columnDefinition = "TEXT")
    private String introduction;

    @Enumerated(EnumType.STRING)
    private AdoptionStatus status;

    @Builder
    public Adoption(User applicant, Dog dog, String introduction) {
        this.applicant = applicant;
        this.dog = dog;
        this.introduction = introduction;
        this.status = AdoptionStatus.PENDING;
    }

    public void updateIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public void updateStatus(AdoptionStatus status) {
        this.status = status;
    }
}
