package com.itda.backend.auth.controller;

import com.itda.backend.auth.dto.AuthMeResponse;
import com.itda.backend.auth.dto.TokenResponse;
import com.itda.backend.auth.service.RefreshTokenService;
import com.itda.backend.global.exception.BusinessException;
import com.itda.backend.global.exception.ErrorCode;
import com.itda.backend.global.jwt.JwtTokenProvider;
import com.itda.backend.global.resolver.AuthUser;
import com.itda.backend.user.domain.User;
import com.itda.backend.user.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;

    @GetMapping("/me")
    public AuthMeResponse me(@AuthUser Long userId) {
        User user = userService.getById(userId);
        return AuthMeResponse.from(user);
    }

    @PostMapping("/refresh")
    public TokenResponse refresh(
            @CookieValue(value = "refreshToken", required = false) String refreshToken) {

        if (refreshToken == null) {
            throw new BusinessException(ErrorCode.REFRESH_TOKEN_NOT_FOUND);
        }
        Long userId = refreshTokenService.validateAndGetUserId(refreshToken);
        String newAccessToken = jwtTokenProvider.createAccessToken(userId);
        return new TokenResponse(newAccessToken);
    }

    @PostMapping("/logout")
    public void logout(@AuthUser Long userId, HttpServletResponse response) {
        refreshTokenService.deleteByUserId(userId);
        clearRefreshTokenCookie(response);
    }

    @DeleteMapping("/account")
    public void deleteAccount(@AuthUser Long userId, HttpServletResponse response) {
        refreshTokenService.deleteByUserId(userId);
        userService.deleteAccount(userId);
        clearRefreshTokenCookie(response);
    }

    private void clearRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
