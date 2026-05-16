package com.itda.backend.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // Common
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "C001", "잘못된 입력값입니다"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C002", "서버 오류가 발생했습니다"),
    FORBIDDEN(HttpStatus.FORBIDDEN, "C003", "권한이 없습니다"),

    // Auth
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "A001", "인증이 필요합니다"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "A002", "유효하지 않은 토큰입니다"),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "A003", "만료된 토큰입니다"),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "A004", "재발급 토큰이 존재하지 않습니다"),

    // User
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "사용자를 찾을 수 없습니다"),
    DUPLICATE_NICKNAME(HttpStatus.CONFLICT, "U002", "이미 사용 중인 닉네임입니다"),
    LIFESTYLE_NOT_FOUND(HttpStatus.BAD_REQUEST, "U003", "라이프스타일을 먼저 입력해주세요"),
    INVALID_NICKNAME(HttpStatus.BAD_REQUEST, "U004", "닉네임 형식이 올바르지 않습니다"),

    // Dog
    DOG_NOT_FOUND(HttpStatus.NOT_FOUND, "D001", "강아지를 찾을 수 없습니다"),
    DUPLICATE_IMAGE_URL(HttpStatus.BAD_REQUEST, "D002", "중복된 이미지 URL입니다"),

    // Post
    POST_NOT_FOUND(HttpStatus.NOT_FOUND, "P001", "게시물을 찾을 수 없습니다"),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "P002", "댓글을 찾을 수 없습니다"),

    // Adoption
    ADOPTION_NOT_FOUND(HttpStatus.NOT_FOUND, "AD001", "입양 신청을 찾을 수 없습니다"),
    DUPLICATE_ADOPTION(HttpStatus.CONFLICT, "AD002", "이미 신청한 강아지입니다"),
    SELF_ADOPTION(HttpStatus.BAD_REQUEST, "AD003", "본인의 강아지에는 신청할 수 없습니다");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
