package com.ssafy.fiveguys.game.player;


import com.ssafy.fiveguys.game.player.entity.PlayerLevel;
import com.ssafy.fiveguys.game.player.repository.PlayerLevelRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LevelTest {

    @Autowired
    PlayerLevelRepository playerLevelRepository;

    @Test
    @DisplayName("level 테스트")
    public void level() {
        PlayerLevel currentLevel100 = playerLevelRepository.findFirstByExpGreaterThanOrderByExpAsc(100);
        System.out.println("currentLevel(100) = " + currentLevel100);
        PlayerLevel currentLevel99 = playerLevelRepository.findFirstByExpGreaterThanOrderByExpAsc(99);
        System.out.println("currentLevel(99) = " + currentLevel99);

        PlayerLevel expByLevel = playerLevelRepository.findExpByLevel(1);
        System.out.println("expByLevel = " + expByLevel);
    }
}
