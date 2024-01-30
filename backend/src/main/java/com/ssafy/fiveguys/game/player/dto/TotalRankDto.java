package com.ssafy.fiveguys.game.player.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TotalRankDto {

    private Long attack;
    private Long defense;
    private Long pass;

}
