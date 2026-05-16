package com.itda.backend.match.service;

import com.itda.backend.dog.domain.Dog;
import com.itda.backend.dog.repository.DogRepository;
import com.itda.backend.global.exception.BusinessException;
import com.itda.backend.global.exception.ErrorCode;
import com.itda.backend.match.domain.RecentView;
import com.itda.backend.match.repository.RecentViewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecentViewService {

    private final RecentViewRepository recentViewRepository;
    private final DogRepository dogRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void log(Long userId, Long dogId) {
        recentViewRepository.findByUserIdAndDogId(userId, dogId)
                .ifPresentOrElse(
                        RecentView::refresh,
                        () -> {
                            Dog dog = dogRepository.findById(dogId)
                                    .orElseThrow(() -> new BusinessException(ErrorCode.DOG_NOT_FOUND));
                            recentViewRepository.save(RecentView.builder()
                                    .userId(userId)
                                    .dog(dog)
                                    .build());
                        }
                );
    }

    public List<Dog> getRecentDogs(Long userId) {
        return recentViewRepository.findTop20ByUserIdOrderByViewedAtDesc(userId)
                .stream()
                .map(RecentView::getDog)
                .toList();
    }
}
