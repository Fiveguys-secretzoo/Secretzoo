package com.ssafy.fiveguys.game.user.exception;

import java.util.NoSuchElementException;

public class RefreshTokenException extends NoSuchElementException {

    public RefreshTokenException(String message) {
        super(message);
    }
}
