package com.example.ranking.repository;

import com.example.ranking.domain.entity.PlayerAnimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlayerAnimalRepository extends JpaRepository<PlayerAnimal, Long> {


    @Query(value = "SELECT * FROM player_animal WHERE player_sequence = ?", nativeQuery = true)
    List<PlayerAnimal> findByPlayerSequence(Long playerSequence);

    @Query(value = "SELECT * FROM player_animal WHERE player_sequence = ? AND animal_id = ?", nativeQuery = true)
    PlayerAnimal findByPlayerSequenceAndAnimalId(Long playerSequence, String animalId);






}
