package com.ssafy.fiveguys.game.player.entity;


import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LevelExp {



    /**
     * turn, success 횟수 기준으로 플레이어 경험치 계산 로직
     * @param turn
     * @param success
     * @return
     */
    public static long expCalculator(long turn, int success) {
        return 5 + (turn / 5 + success / 8);
    }
}
