package com.itda.backend.auth.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class OAuth2UserInfo{
    private String email;
    private String name;

    public static OAuth2UserInfo fromGoogle(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
                .email((String) attributes.get("email"))
                .name((String) attributes.get("name"))
                .build();
    }
}
