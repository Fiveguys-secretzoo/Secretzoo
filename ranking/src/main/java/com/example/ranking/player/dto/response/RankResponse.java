package com.example.ranking.player.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RankResponse {
    private String playerId;
    private Double score;
}
