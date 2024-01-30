package com.ssafy.fiveguys.game.player.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RankResponse {
    private Long userSequence;
    private String nickname;
    private Double score;
}
