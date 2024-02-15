package com.ssafy.fiveguys.game.common.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ErrorResponse {
    private String code;
    private String description;

    public ErrorResponse(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
