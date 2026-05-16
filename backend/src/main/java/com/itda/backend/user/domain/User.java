package com.itda.backend.user.domain;

import com.itda.backend.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String nickname;

    private String regionSido;

    private String regionSigungu;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProfileStatus profileStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OAuthProvider provider;

    @Embedded
    private Lifestyle lifestyle;

    @Builder
    public User(String email, String name, OAuthProvider provider) {
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.profileStatus = ProfileStatus.INCOMPLETE;
    }

    public void completeOnboarding(String nickname, String regionSido, String regionSigungu) {
        this.nickname = nickname;
        this.regionSido = regionSido;
        this.regionSigungu = regionSigungu;
    }

    public void updateProfile(String nickname,
                              String regionSido,
                              String regionSigungu,
                              Lifestyle lifestyle) {
        this.nickname = nickname;
        this.regionSido = regionSido;
        this.regionSigungu = regionSigungu;
        this.lifestyle = lifestyle;

        if (lifestyle != null && lifestyle.isComplete()) {
            this.profileStatus = ProfileStatus.COMPLETE;
        }
    }

    public boolean hasCompleteLifestyle() {
        return lifestyle != null && lifestyle.isComplete();
    }
}
