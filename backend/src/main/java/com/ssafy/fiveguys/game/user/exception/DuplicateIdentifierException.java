package com.ssafy.fiveguys.game.user.exception;

public class DuplicateIdentifierException extends IllegalArgumentException{

    public DuplicateIdentifierException() {
        super("데이터 중복");
    }

    public DuplicateIdentifierException(String message) {
        super(message);
    }
}
