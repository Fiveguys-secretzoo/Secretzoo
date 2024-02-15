package com.ssafy.fiveguys.game.user.exception;

import io.jsonwebtoken.MalformedJwtException;

public class JwtBlackListException extends MalformedJwtException {

    public JwtBlackListException(String message) {
        super(message);
    }
}
