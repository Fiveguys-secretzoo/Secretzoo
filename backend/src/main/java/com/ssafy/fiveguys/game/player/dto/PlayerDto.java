package com.ssafy.fiveguys.game.player.dto;


import com.ssafy.fiveguys.game.player.entity.RankingScore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlayerDto {

    private Long playerSequence;

    private Long totalRound;
    private Long totalTurn;

    private RankingScore rankingScore;

    private Long exp;
    private int level;


}
