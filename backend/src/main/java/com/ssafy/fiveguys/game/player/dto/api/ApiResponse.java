package com.ssafy.fiveguys.game.player.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private int count;
    private T data;
    private int totalPlayer;
}
