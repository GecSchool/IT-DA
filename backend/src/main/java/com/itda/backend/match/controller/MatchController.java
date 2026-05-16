package com.itda.backend.match.controller;

import com.itda.backend.global.resolver.AuthUser;
import com.itda.backend.match.dto.MatchRecommendationResponse;
import com.itda.backend.match.dto.RecentViewResponse;
import com.itda.backend.match.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @GetMapping("/recommendations")
    public ResponseEntity<MatchRecommendationResponse> getRecommendation(
            @AuthUser Long userId,
            @RequestParam(required = false) Long lastDogId) {
        return matchService.getNextRecommendation(userId, lastDogId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping("/recent-views")
    public List<RecentViewResponse> getRecentViews(@AuthUser Long userId) {
        return matchService.getRecentViews(userId);
    }
}
