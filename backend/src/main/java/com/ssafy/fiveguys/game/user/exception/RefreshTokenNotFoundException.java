package com.ssafy.fiveguys.game.user.exception;

import java.util.NoSuchElementException;

public class RefreshTokenNotFoundException extends NoSuchElementException {

    public RefreshTokenNotFoundException(String message) {
        super(message);
    }
}
