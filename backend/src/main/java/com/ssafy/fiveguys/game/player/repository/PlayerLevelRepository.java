package com.ssafy.fiveguys.game.player.repository;

import com.ssafy.fiveguys.game.player.entity.PlayerLevel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlayerLevelRepository extends JpaRepository<PlayerLevel, Integer> {


    PlayerLevel findFirstByExpGreaterThanOrderByExpAsc(long exp);

    @Query("SELECT p FROM PlayerLevel p WHERE p.level = :level")
    PlayerLevel findExpByLevel(@Param("level") int level);
}
