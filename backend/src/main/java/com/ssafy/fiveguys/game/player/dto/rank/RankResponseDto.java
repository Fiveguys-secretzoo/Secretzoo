package com.ssafy.fiveguys.game.player.dto.rank;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RankResponseDto {
    private Long userSequence;
    private String nickname;
    private Double score;

    private int level;
    private long exp;
}
