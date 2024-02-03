package com.ssafy.fiveguys.game.player.repository;

import com.ssafy.fiveguys.game.player.entity.Player;
import jakarta.persistence.QueryHint;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;

public interface PlayerRepository extends JpaRepository<Player, Long> {



    Player findByUser_UserSequence(Long userSequence);

//    @QueryHints(value = @QueryHint(name = "org.hibernate.readOnly", value = "true"))
    List<Player> findTop10ByOrderByRankingScoreAttackScoreDesc();
    List<Player> findTop10ByOrderByRankingScoreDefenseScoreDesc();
    List<Player> findTop10ByOrderByRankingScorePassScoreDesc();
}
