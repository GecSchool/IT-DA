package com.itda.backend.match.service;

import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.domain.DogStatus;
import com.itda.backend.dog.repository.DogRepository;
import com.itda.backend.global.exception.BusinessException;
import com.itda.backend.global.exception.ErrorCode;
import com.itda.backend.match.domain.MatchScoreCalculator;
import com.itda.backend.match.domain.MatchScoreCalculator.MatchResult;
import com.itda.backend.match.dto.MatchRecommendationResponse;
import com.itda.backend.match.dto.RecentViewResponse;
import com.itda.backend.post.domain.Post;
import com.itda.backend.post.repository.PostRepository;
import com.itda.backend.user.domain.User;
import com.itda.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MatchService {

    private final UserService userService;
    private final DogRepository dogRepository;
    private final PostRepository postRepository;
    private final MatchScoreCalculator calculator;
    private final RecentViewService recentViewService;

    private record ScoredDog(Dog dog, MatchResult result) {}

    public Optional<MatchRecommendationResponse> getNextRecommendation(Long userId, Long lastDogId) {
        User user = userService.getById(userId);

        if (user.getLifestyle() == null) {
            throw new BusinessException(ErrorCode.LIFESTYLE_NOT_FOUND);
        }

        List<ScoredDog> scored = dogRepository.findAll().stream()
                .filter(dog -> dog.getStatus() == DogStatus.AVAILABLE)
                .filter(dog -> !dog.getFoster().getId().equals(userId))
                .map(dog -> new ScoredDog(dog, calculator.calculateResult(user, dog)))
                .sorted(Comparator.comparingInt((ScoredDog sd) -> sd.result().score()).reversed()
                        .thenComparingLong(sd -> sd.dog().getId()))
                .toList();

        if (scored.isEmpty()) {
            return Optional.empty();
        }

        if (lastDogId == null) {
            return Optional.of(toResponse(scored.get(0)));
        }

        for (int i = 0; i < scored.size(); i++) {
            if (scored.get(i).dog().getId().equals(lastDogId)) {
                if (i + 1 < scored.size()) {
                    return Optional.of(toResponse(scored.get(i + 1)));
                }
                return Optional.empty();
            }
        }

        return Optional.of(toResponse(scored.get(0)));
    }

    private MatchRecommendationResponse toResponse(ScoredDog scoredDog) {
        List<Post> posts = postRepository.findTop6ByDogIdOrderByIdDesc(scoredDog.dog().getId());
        return MatchRecommendationResponse.of(scoredDog.dog(), scoredDog.result(), posts);
    }

    public List<RecentViewResponse> getRecentViews(Long userId) {
        return recentViewService.getRecentDogs(userId)
                .stream()
                .map(RecentViewResponse::from)
                .toList();
    }
}
