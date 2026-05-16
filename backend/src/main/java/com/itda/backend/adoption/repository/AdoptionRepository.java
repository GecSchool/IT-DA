package com.itda.backend.adoption.repository;

import com.itda.backend.adoption.domain.Adoption;
import org.springframework.data.jpa.repository.JpaRepository;
import com.itda.backend.adoption.domain.AdoptionStatus;
import java.util.List;
import java.util.Optional;

public interface AdoptionRepository extends JpaRepository<Adoption, Long> {
    List<Adoption> findByDogFosterIdOrderByCreatedAtDesc(Long fosterId);
    List<Adoption> findByApplicantIdOrderByCreatedAtDesc(Long applicantId);
    Optional<Adoption> findByApplicantIdAndDogId(Long applicantId, Long dogId);
    boolean existsByApplicantIdAndDogId(Long applicantId, Long dogId);
    int countByDogId(Long dogId);
    boolean existsByDogIdAndStatus(Long dogId, AdoptionStatus status);
}