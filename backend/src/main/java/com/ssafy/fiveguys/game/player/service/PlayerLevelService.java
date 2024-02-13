package com.ssafy.fiveguys.game.player.service;


import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.entity.PlayerLevel;
import com.ssafy.fiveguys.game.player.repository.PlayerLevelRepository;
import com.ssafy.fiveguys.game.player.repository.PlayerRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlayerLevelService {

    private final PlayerRepository playerRepository;
    private final PlayerLevelRepository playerLevelRepository;

    /**
     * 레벨 업데이트
     *
     * @param userSequence
     * @param exp
     */
    @Transactional
    public void updateLevel(Long userSequence, Long exp) {

        Player player = playerRepository.findByUser_UserSequence(userSequence);
        //레벨 업데이트
        PlayerLevel currentLevel = playerLevelRepository.findFirstByExpGreaterThanOrderByExpAsc(exp);
//        PlayerLevel prevLevel = playerLevelRepository.findExpByLevel(currentLevel.getLevel() - 1);
        player.setPlayerLevel(currentLevel);
        log.debug("user seq = {}", userSequence);
        log.debug("player exp = {}", player.getExp());
        log.debug("player level = {}", player.getPlayerLevel());
    }
}
