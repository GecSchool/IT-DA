package com.itda.backend.dog.repository;

import com.itda.backend.dog.domain.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogRepository extends JpaRepository<Dog, Long> {

    List<Dog> findAllByFosterIdOrderByCreatedAtDesc(Long fosterId);

    List<Dog> findAllByOrderByCreatedAtDesc();
}