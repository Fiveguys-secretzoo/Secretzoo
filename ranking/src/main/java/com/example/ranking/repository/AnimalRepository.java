package com.example.ranking.repository;

import com.example.ranking.domain.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, String> {

    Animal findByAnimalId(String animalId);
}
