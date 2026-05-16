package com.itda.backend.match.service;

import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.domain.DogStatus;
import com.itda.backend.dog.repository.DogRepository;
import com.itda.backend.match.domain.MatchScoreCalculator;
import com.itda.backend.match.dto.MatchRecommendationResponse;
import com.itda.backend.match.dto.RecentViewResponse;
import com.itda.backend.user.domain.User;
import com.itda.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MatchService {

    private final UserService userService;
    private final DogRepository dogRepository;
    private final MatchScoreCalculator calculator;
    private final RecentViewService recentViewService;

    public List<MatchRecommendationResponse> getRecommendations(Long userId) {
        User user = userService.getById(userId);

        return dogRepository.findAll()
                .stream()
                .filter(dog -> dog.getStatus() == DogStatus.AVAILABLE)
                .filter(dog -> !dog.getFoster().getId().equals(userId))
                .map(dog -> MatchRecommendationResponse.of(dog, calculator.calculate(user, dog)))
                .sorted(Comparator.comparingInt(MatchRecommendationResponse::matchScore).reversed())
                .toList();
    }

    public List<RecentViewResponse> getRecentViews(Long userId) {
        return recentViewService.getRecentDogs(userId)
                .stream()
                .map(RecentViewResponse::from)
                .toList();
    }
}
