package com.example.ranking.player.repository;

import com.example.ranking.player.entity.Player;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    Player findByPlayerId(String playerId);

    Player findByPlayerSequence(Long playerSequence);
    List<Player> findTop10ByOrderByRankingScoreAttackScoreDesc();
    List<Player> findTop10ByOrderByRankingScoreDefenseScoreDesc();
    List<Player> findTop10ByOrderByRankingScorePassScoreDesc();
}
