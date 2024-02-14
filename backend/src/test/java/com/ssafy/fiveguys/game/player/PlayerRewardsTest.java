package com.ssafy.fiveguys.game.player;

import com.ssafy.fiveguys.game.player.entity.PlayerRewards;
import com.ssafy.fiveguys.game.player.repository.PlayerRewardsRepository;
import io.jsonwebtoken.lang.Assert;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class PlayerRewardsTest {
    
    @Autowired
    PlayerRewardsRepository playerRewardsRepository;

    @Test
    void findNotDoneRewardsByPlayerSequence() {
        List<PlayerRewards> notDoneRewardsByPlayerSequence = playerRewardsRepository.findNotDoneRewardsByPlayerSequence(1L);
        System.out.println("notDoneRewardsByPlayerSequence = " + notDoneRewardsByPlayerSequence);
    }

    @Test
    void findNotDoneRewardsByPlayerSequenceWithAnimalId() {
        List<PlayerRewards> tiger01 = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(2L, "TIGER01");
        System.out.println("playerRewardsRepository = " + tiger01);

    }

    @Test
    void findRewardsByUserSequence() {
        List<PlayerRewards> rewardsByUserSequence = playerRewardsRepository.findRewardsByUserSequence(101L);
        System.out.println("rewardsByUserSequence = " + rewardsByUserSequence);
    }


    @Test
    void findDoneRewardsWithRewardsId() {
        int tiger01 = playerRewardsRepository.countDoneRewardsWithRewardsId("T001");
    }

    @Test
    @DisplayName("플레이어 완료 업적, 미완료 업적 조회 테스트")
    void findDoneRewardsByUserSequence() {
        List<PlayerRewards> doneRewardsByUserSequence = playerRewardsRepository.findDoneRewardsByUserSequence(102L);
        List<PlayerRewards> notDoneRewardsByUserSequence = playerRewardsRepository.findNotDoneRewardsByUserSequence(102L);

        System.out.println("doneRewardsByUserSequence = " + doneRewardsByUserSequence);
        System.out.println("notDoneRewardsByUserSequence = " + notDoneRewardsByUserSequence);

        Assertions.assertThat(doneRewardsByUserSequence.size() + notDoneRewardsByUserSequence.size() == 64);
    }

}
