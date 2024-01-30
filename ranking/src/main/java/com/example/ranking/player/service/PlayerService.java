package com.example.ranking.player.service;


import com.example.ranking.player.dto.PlayerDto;
import com.example.ranking.player.entity.LevelExp;
import com.example.ranking.player.entity.Player;
import com.example.ranking.player.repository.PlayerRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerDto getPlayerInfo(Long playerSequence) {
        Player player = playerRepository.findByPlayerSequence(playerSequence);

        if(player == null) return null;
        return new PlayerDto(playerSequence, player.getTotalRound(),
            player.getTotalTurn(), player.getRankingScore(), player.getExp(), player.getLevel());
    }


    public Long playerTotalCount() {
        return playerRepository.count();
    }


    @Transactional
    public void saveExp(Long playerSequence, long turn, int totalSuccess) {

        log.info("player seq = {}", playerSequence);

        //플에이어 경험지 계산
        long exp = LevelExp.expCalculator(turn, totalSuccess);

        //플레이어 조회
        Player player = playerRepository.findByPlayerSequence(playerSequence);

        log.info("player curr exp = {}", player.getExp());
        log.info("player add exp = {}", exp);

        //경험치 업데이트
        player.setExp(exp + player.getExp());

        log.info("player new exp = {}", player.getExp());

        //레벨 업데이트
        this.updateLevel(playerSequence, player.getExp());
    }

    public void updateLevel(Long playerSequence, Long exp) {

        Player player = playerRepository.findByPlayerSequence(playerSequence);

        int level;



        // 레벨 로직 -> 현재 만렙 20
        if (exp < 100) level = 1;
        else if (exp < 200) level = 2;
        else if (exp < 400) level = 3;
        else if (exp < 600) level = 4;
        else if (exp < 800) level = 5;
        else if (exp < 1000) level = 6;
        else if (exp < 1400) level = 7;
        else if (exp < 1800) level = 8;
        else if (exp < 2200) level = 9;
        else if (exp < 2800) level = 10;
        else if (exp < 3200) level = 11;
        else if (exp < 4000) level = 12;
        else if (exp < 4800) level = 13;
        else if (exp < 5600) level = 15;
        else if (exp < 6600) level = 16;
        else if (exp < 7600) level = 17;
        else if (exp < 8600) level = 18;
        else if (exp < 10000) level = 19;
        else level  = 20;

        player.setLevel(level);

        log.info("player seq = {}", playerSequence);
        log.info("player exp = {}", player.getExp());
        log.info("player level = {}", player.getLevel());

    }
}
