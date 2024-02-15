package com.ssafy.fiveguys.game.common.exception;

import com.ssafy.fiveguys.game.common.dto.ErrorResponse;
import com.ssafy.fiveguys.game.user.exception.ConnectionException;
import com.ssafy.fiveguys.game.user.exception.DuplicateIdentifierException;
import com.ssafy.fiveguys.game.user.exception.JwtBlackListException;
import com.ssafy.fiveguys.game.user.exception.PasswordException;
import com.ssafy.fiveguys.game.user.exception.RefreshTokenException;
import com.ssafy.fiveguys.game.user.exception.UserNotFoundException;
import com.ssafy.fiveguys.game.user.exception.VerificationCodeException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(annotations = RestController.class)
public class RestControllerExceptionHandler {

    @ExceptionHandler(DuplicateIdentifierException.class) // 아이디, 이메일 중복 예외 처리
    public ResponseEntity<ErrorResponse> handleDuplicatedException(
        DuplicateIdentifierException exception) {
        log.debug("DuplicateIdentifierException Handler 발동");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
            new ErrorResponse("ERROR_40901", exception.getMessage()));
    }

    @ExceptionHandler(RefreshTokenException.class) // RT 관련 예외 처리
    public ResponseEntity<ErrorResponse> handleRefreshTokenNotFoundException(
        RefreshTokenException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            new ErrorResponse("ERROR_40101", exception.getMessage()));
    }

    @ExceptionHandler(MalformedJwtException.class) // 유효하지 않는 토큰 예외 처리
    public ResponseEntity<ErrorResponse> handleMalformedJwtException(
        MalformedJwtException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            new ErrorResponse("ERROR_40102", exception.getMessage()));
    }
    @ExceptionHandler(JwtBlackListException.class) // JWT Black List(로그아웃된 엑세스 토큰 관리) 예외 처리
    public ResponseEntity<ErrorResponse> handleJwtBlackListException(
        MalformedJwtException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            new ErrorResponse("ERROR_40103", exception.getMessage()));
    }

    @ExceptionHandler(JwtException.class) // JWT 유효성 검사
    public ResponseEntity<ErrorResponse> handleJwtException(JwtException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            new ErrorResponse("ERROR_40104", exception.getMessage()));
    }

    @ExceptionHandler({UserNotFoundException.class, PasswordException.class}) // 로그인 예외 처리
    public ResponseEntity<ErrorResponse> handleLoginException(Exception exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            new ErrorResponse("ERROR_40001", exception.getMessage()));
    }

    @ExceptionHandler(UnsupportedJwtException.class) // 지원하지 않는 토큰 인증 방식 예외 처리
    public ResponseEntity<ErrorResponse> handleJwtTokenException(UnsupportedJwtException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            new ErrorResponse("ERROR_40002", exception.getMessage()));
    }

    @ExceptionHandler(VerificationCodeException.class) // 이메일 인증 코드가 일치하지 않거나 유효시간이 만료된 예외 처리
    public ResponseEntity<ErrorResponse> handleJVerificationCodeException(VerificationCodeException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            new ErrorResponse("ERROR_40003", exception.getMessage()));
    }

    @ExceptionHandler(ConnectionException.class) // 동시 접속 로그인 예외 처리
    public ResponseEntity<ErrorResponse> handleJConnectionException(ConnectionException exception) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
            new ErrorResponse("ERROR_40301", exception.getMessage()));
    }
}
