package com.example.ranking.repository;

import com.example.ranking.domain.entity.PlayerAnimal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerAnimalRepository extends JpaRepository<PlayerAnimal, Long> {

}
