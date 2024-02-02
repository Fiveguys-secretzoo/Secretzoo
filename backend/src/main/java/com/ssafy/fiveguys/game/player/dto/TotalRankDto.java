package com.ssafy.fiveguys.game.player.dto;

import com.ssafy.fiveguys.game.player.entity.AnimalScore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TotalRankDto {

    private int attackRank;
    private int defenseRank;
    private int passRank;
    private Long passCount;

    private AnimalScore animalScore;

}
