package com.ssafy.fiveguys.game.common;

import com.ssafy.fiveguys.game.player.aop.AspectPlayer;
import com.ssafy.fiveguys.game.player.dto.rank.RankRequestDto;
import com.ssafy.fiveguys.game.player.repository.PlayerRepository;
import com.ssafy.fiveguys.game.player.service.PlayerService;
import com.ssafy.fiveguys.game.player.service.RankService;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Slf4j
@SpringBootTest
@Import({AspectPlayer.LogAspect.class, AspectPlayer.TxAspect.class})
public class AopTest {

    @Autowired
    PlayerService playerService;
    @Autowired
    RankService rankService;

    @Autowired
    PlayerRepository playerRepository;

    @Test
    void aopInfo() {
        log.info("isAopProxy, playerService={}", AopUtils.isAopProxy(playerService));
        log.info("isAopProxy, playerRepository={}", AopUtils.isAopProxy(playerRepository));
    }

    @Test
    void success() {
        int playerTotalCount = playerService.playerTotalCount();
        System.out.println("playerTotalCount = " + playerTotalCount);
    }


    @Test
    void exception() {
        Assertions.assertThatThrownBy(() -> playerService.savePlayer(999L, new RankRequestDto(null, 1, 1,1,1, 1, 1, 1)))
            .isInstanceOf(NullPointerException.class);
    }

}
