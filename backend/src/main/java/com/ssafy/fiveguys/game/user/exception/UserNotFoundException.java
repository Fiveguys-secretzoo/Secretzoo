package com.ssafy.fiveguys.game.user.exception;

import java.util.NoSuchElementException;

public class UserNotFoundException extends NoSuchElementException {

    public UserNotFoundException() {
        super("입력한 유저가 존재하지 않습니다.");
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
