package com.example.ranking.repository;

import com.example.ranking.domain.Player;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    Player findByPlayerId(String playerId);

    List<Player> findTop10ByOrderByRankingScoreAttackScoreDesc();
    List<Player> findTop10ByOrderByRankingScoreDefenseScoreDesc();
    List<Player> findTop10ByOrderByRankingScorePassScoreDesc();
}
