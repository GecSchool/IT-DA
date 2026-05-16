package com.itda.backend.dog.controller;

import com.itda.backend.dog.dto.request.DogRequest;
import com.itda.backend.dog.dto.response.DogDetailResponse;
import com.itda.backend.dog.dto.response.DogSummaryResponse;
import com.itda.backend.dog.service.DogService;
import com.itda.backend.global.resolver.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.itda.backend.dog.dto.response.DogRecentResponse;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dogs")
@RequiredArgsConstructor
public class DogController {

    private final DogService dogService;

    @PostMapping
    public Map<String, Long> register(@AuthUser Long userId,
                                      @RequestBody DogRequest request) {
        Long dogId = dogService.register(userId, request);
        return Map.of("dogId", dogId);
    }

    @GetMapping("/me")
    public List<DogSummaryResponse> getMyDogs(@AuthUser Long userId) {
        return dogService.getMyDogs(userId);
    }

    @GetMapping("/recent")
    public List<DogRecentResponse> getRecentDogs(
            @RequestParam(defaultValue = "10") int limit) {
        return dogService.getRecentDogs(limit);
    }

    @GetMapping("/{dogId}")
    public DogDetailResponse getDog(@PathVariable Long dogId,
                                    @AuthUser Long userId) {
        // RecentViewService 완성 후 호출, 그냥 상세조회만 함
        return dogService.getDetail(dogId, userId);
    }

    @PutMapping("/{dogId}")
    public void updateDog(@PathVariable Long dogId,
                          @AuthUser Long userId,
                          @RequestBody DogRequest request) {
        dogService.update(dogId, userId, request);
    }

    @PatchMapping("/{dogId}/complete")
    public void completeDog(@PathVariable Long dogId,
                            @AuthUser Long userId) {
        dogService.complete(dogId, userId);
    }

    @DeleteMapping("/{dogId}")
    public void deleteDog(@PathVariable Long dogId,
                          @AuthUser Long userId) {
        dogService.delete(dogId, userId);
    }
}
