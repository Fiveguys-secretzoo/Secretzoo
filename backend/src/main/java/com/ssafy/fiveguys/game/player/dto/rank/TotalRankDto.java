package com.ssafy.fiveguys.game.player.dto.rank;

import com.ssafy.fiveguys.game.player.entity.embeddedType.AnimalScore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TotalRankDto {

    private RankSimpleDto attackRank;
    private RankSimpleDto defenseRank;
    private RankSimpleDto passRank;
    private Long passCount;

    private AnimalScore animalScore;

}
