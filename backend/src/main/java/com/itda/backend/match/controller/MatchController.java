package com.itda.backend.match.controller;

import com.itda.backend.global.resolver.AuthUser;
import com.itda.backend.match.dto.MatchRecommendationResponse;
import com.itda.backend.match.dto.RecentViewResponse;
import com.itda.backend.match.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @GetMapping("/recommendations")
    public List<MatchRecommendationResponse> getRecommendations(@AuthUser Long userId) {
        return matchService.getRecommendations(userId);
    }

    @GetMapping("/recent-views")
    public List<RecentViewResponse> getRecentViews(@AuthUser Long userId) {
        return matchService.getRecentViews(userId);
    }
}
