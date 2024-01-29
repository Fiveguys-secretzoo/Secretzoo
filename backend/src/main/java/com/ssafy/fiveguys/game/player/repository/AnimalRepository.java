package com.ssafy.fiveguys.game.player.repository;

import com.ssafy.fiveguys.game.player.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, String> {

    Animal findByAnimalId(String animalId);
}
