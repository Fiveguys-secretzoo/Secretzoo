package com.example.ranking.service;


import com.example.ranking.domain.Score;
import com.example.ranking.domain.dto.GameResult;
import com.example.ranking.domain.entity.Player;
import com.example.ranking.repository.PlayerAnimalRepository;
import com.example.ranking.repository.PlayerRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RewardsService {

    private final PlayerRepository playerRepository;
    private final PlayerAnimalRepository playerAnimalRepository;
    private final EntityManager em;

    /**
     * player rewards 지표를 DB에 저장(업데이트)
     */
    @Transactional
    public void saveRewards(GameResult gameResult) {

        Player findPlayer = playerRepository.findByPlayerId(gameResult.getPlayerId());

        //turn 과 round 누적 업데이트
        findPlayer.setTotalRound(findPlayer.getTotalRound() + gameResult.getRound());
        findPlayer.setTotalTurn(findPlayer.getTotalTurn() + gameResult.getTurn());

        playerAnimalRepository.findBy


    }

}
