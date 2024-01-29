package com.example.ranking.player.repository;

import com.example.ranking.player.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, String> {

    Animal findByAnimalId(String animalId);
}
