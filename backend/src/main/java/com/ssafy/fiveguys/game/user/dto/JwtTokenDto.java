package com.ssafy.fiveguys.game.user.dto;

import com.ssafy.fiveguys.game.user.jwt.JwtProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Builder
@Getter
@AllArgsConstructor
public class JwtTokenDto {
    private String accessToken;
    private String refreshToken;

    public Map<String, Object> responseDto() {
        Map<String, Object> result = new HashMap<>();
        result.put(JwtProperties.ACCESS_TOKEN, this.getAccessToken());
        result.put(JwtProperties.REFRESH_TOKEN, this.getRefreshToken());
        result.put(JwtProperties.EXPRIES_IN, JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);
        return result;
    }
}
