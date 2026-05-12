package com.itda.backend.user.service;

import com.itda.backend.global.exception.BusinessException;
import com.itda.backend.global.exception.ErrorCode;
import com.itda.backend.user.domain.User;
import com.itda.backend.user.dto.request.OnboardingRequest;
import com.itda.backend.user.dto.request.UpdateUserRequest;
import com.itda.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public User getById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    public boolean isNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public void onboarding(Long userId, OnboardingRequest request) {
        User user = getById(userId);

        if (!request.nickname().equals(user.getNickname())
                && userRepository.existsByNickname(request.nickname())) {
            throw new BusinessException(ErrorCode.DUPLICATE_NICKNAME);
        }

        user.completeOnboarding(request.nickname(),
                request.regionSido(),
                request.regionSigungu());
    }

    @Transactional
    public void updateProfile(Long userId, UpdateUserRequest request) {
        User user = getById(userId);

        if (!request.nickname().equals(user.getNickname())
                && userRepository.existsByNickname(request.nickname())) {
            throw new BusinessException(ErrorCode.DUPLICATE_NICKNAME);
        }

        user.updateProfile(
                request.nickname(),
                request.regionSido(),
                request.regionSigungu(),
                request.lifestyle().toEntity()
        );
    }
}
