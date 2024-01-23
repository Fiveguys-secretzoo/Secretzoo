package com.example.ranking.repository;

import com.example.ranking.domain.entity.Player;
import com.example.ranking.domain.entity.PlayerAnimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerAnimalRepository extends JpaRepository<PlayerAnimal, Long> {

    List<PlayerAnimal> findByPlayerSequence(Long playerSequence);
}
