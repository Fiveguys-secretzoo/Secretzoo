package com.ssafy.fiveguys.game.player.repository;

import com.ssafy.fiveguys.game.player.entity.Player;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {


    Player findByPlayerSequence(Long playerSequence);


    Player findByUserSequence(Long userSequence);
    List<Player> findTop10ByOrderByRankingScoreAttackScoreDesc();
    List<Player> findTop10ByOrderByRankingScoreDefenseScoreDesc();
    List<Player> findTop10ByOrderByRankingScorePassScoreDesc();
}
