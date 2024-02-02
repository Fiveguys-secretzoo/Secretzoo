package com.ssafy.fiveguys.game.player.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result2<T> {
    private int count;
    private T data;
    private long totalPlayer;
}
