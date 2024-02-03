package com.ssafy.fiveguys.game.player.dto;


import com.ssafy.fiveguys.game.player.entity.embeddedType.RankingScore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlayerDto {

    private Long userSequence;

    private long totalRound;
    private long totalTurn;

    private RankingScore rankingScore;

    private long exp;
    private int level;


}
