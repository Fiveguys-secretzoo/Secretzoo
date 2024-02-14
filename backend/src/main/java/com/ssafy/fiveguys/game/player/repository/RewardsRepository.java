package com.ssafy.fiveguys.game.player.repository;

import com.ssafy.fiveguys.game.player.entity.Rewards;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardsRepository extends JpaRepository<Rewards, String> {

    public List<Rewards> findByAnimalId(String animalId);

}
