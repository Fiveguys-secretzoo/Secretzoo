package com.ssafy.fiveguys.game.user.jwt;

public interface JwtProperties {

    final String SECRET_KEY = "c3ByaW5nYm9vdC1qd3QtdHV0b3JpYWwtc3ByaW5nYm9vdF2qd3QtdHV0b3JpYWntc3ByaW5nYm9vdC1qd3QtdHV0a3JpYWwK";
    final Long ACCESS_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60L; // 1시간
    final Long REFRESH_TOKEN_EXPIRATION_TIME = 1209600000L; // 14일
    final String HEADER = "Authorization";
    final String TOKEN_PREFIX = "Bearer ";
    final String ACCESS_TOKEN = "access-token";
    final String REFRESH_TOKEN = "refresh-token";
    final String EXPRIES_IN = "expires_in";
}
