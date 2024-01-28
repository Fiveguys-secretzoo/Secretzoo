package com.example.ranking.player.repository;

import com.example.ranking.player.entity.Rewards;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardsRepository extends JpaRepository<Rewards, String> {

    public List<Rewards> findByAnimalId(String animalId);

}
