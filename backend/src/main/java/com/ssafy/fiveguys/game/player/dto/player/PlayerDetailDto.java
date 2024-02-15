package com.ssafy.fiveguys.game.player.dto.player;

import com.ssafy.fiveguys.game.player.entity.embeddedType.RankingScore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlayerDetailDto {
    private Long userSequence;
    private String userId;
    private String name;
    private String nickname;
    private String profileNumber;
    private String mainReward;
    private long totalRound;
    private long totalTurn;
    private RankingScore rankingScore;
    private int currentLevel;
    private long prevExp;
    private long currentExp;
    private long nextExp;
}
