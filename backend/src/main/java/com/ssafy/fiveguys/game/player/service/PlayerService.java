package com.ssafy.fiveguys.game.player.service;


import com.ssafy.fiveguys.game.player.dto.PlayerDto;
import com.ssafy.fiveguys.game.player.entity.LevelExp;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.repository.PlayerRepository;
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
            player.getTotalTurn(), player.getRankingScore(), player.getExp(), player.getPlayerLevel());
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

        int playerLevel;



        // 레벨 로직 -> 현재 만렙 20
        if (exp < 100) playerLevel = 1;
        else if (exp < 200) playerLevel = 2;
        else if (exp < 400) playerLevel = 3;
        else if (exp < 600) playerLevel = 4;
        else if (exp < 800) playerLevel = 5;
        else if (exp < 1000) playerLevel = 6;
        else if (exp < 1400) playerLevel = 7;
        else if (exp < 1800) playerLevel = 8;
        else if (exp < 2200) playerLevel = 9;
        else if (exp < 2800) playerLevel = 10;
        else if (exp < 3200) playerLevel = 11;
        else if (exp < 4000) playerLevel = 12;
        else if (exp < 4800) playerLevel = 13;
        else if (exp < 5600) playerLevel = 15;
        else if (exp < 6600) playerLevel = 16;
        else if (exp < 7600) playerLevel = 17;
        else if (exp < 8600) playerLevel = 18;
        else if (exp < 10000) playerLevel = 19;
        else playerLevel  = 20;

        player.setPlayerLevel(playerLevel);

        log.info("player seq = {}", playerSequence);
        log.info("player exp = {}", player.getExp());
        log.info("player level = {}", player.getPlayerLevel());

    }
}
