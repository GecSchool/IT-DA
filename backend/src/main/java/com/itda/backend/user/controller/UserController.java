package com.itda.backend.user.controller;

import com.itda.backend.global.resolver.AuthUser;
import com.itda.backend.user.dto.request.OnboardingRequest;
import com.itda.backend.user.dto.request.UpdateUserRequest;
import com.itda.backend.user.dto.response.NicknameCheckResponse;
import com.itda.backend.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/check-nickname")
    public NicknameCheckResponse checkNickname(@RequestParam String nickname) {
        return new NicknameCheckResponse(userService.isNicknameDuplicate(nickname));
    }

    @PostMapping("/onboarding")
    public void onboarding(@AuthUser Long userId,
                           @Valid @RequestBody OnboardingRequest request) {
        userService.onboarding(userId, request);
    }

    @PutMapping("/me")
    public void updateMe(@AuthUser Long userId,
                         @Valid @RequestBody UpdateUserRequest request) {
        userService.updateProfile(userId, request);
    }
}
