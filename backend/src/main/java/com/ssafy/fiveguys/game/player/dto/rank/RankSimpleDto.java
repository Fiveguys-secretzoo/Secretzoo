package com.ssafy.fiveguys.game.player.dto.rank;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankSimpleDto {

    private int rank;
    private double score;
}
