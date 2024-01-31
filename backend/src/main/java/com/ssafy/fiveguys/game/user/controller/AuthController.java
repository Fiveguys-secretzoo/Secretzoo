package com.ssafy.fiveguys.game.user.controller;

import com.ssafy.fiveguys.game.user.dto.JwtTokenDto;
import com.ssafy.fiveguys.game.user.dto.LoginRequestDto;
import com.ssafy.fiveguys.game.user.dto.UserSignDto;
import com.ssafy.fiveguys.game.user.jwt.JwtProperties;
import com.ssafy.fiveguys.game.user.service.AuthService;
import com.ssafy.fiveguys.game.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
// @CrossOrigin("http://localhost:3000")
@RequestMapping("/auth")
@Tag(name = "AuthController",description = "사용자(회원, 비회원)가 이용할 수 있는 서비스")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @Operation(summary = "회원가입 API")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserSignDto userSignDto) {
        System.out.println("userSignDto.getUserId() = " + userSignDto.getUserId());
        userService.signUp(userSignDto);
        return ResponseEntity.status(HttpStatus.OK)
            .body("signUp Success")
            //.build()
            ;
    }

    @Operation(summary = "자체 로그인 API")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginDto) {
        JwtTokenDto jwtTokenDto = authService.login(loginDto);
        return ResponseEntity.status(HttpStatus.OK)
            .header(HttpHeaders.AUTHORIZATION,
                JwtProperties.TOKEN_PREFIX + jwtTokenDto.getAccessToken())
            .header(JwtProperties.REFRESH_TOKEN, jwtTokenDto.getRefreshToken())
            .body("Login Success")
            //  .build()
            ;
    }

    @Operation(summary = "RT 재발급 API, reqeust(헤더) : Access Token, Refresh Token")
    @PostMapping("/token/refresh")
    public ResponseEntity<?> reissue(HttpServletRequest request) {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        String refreshToken = request.getHeader(JwtProperties.REFRESH_TOKEN);
        JwtTokenDto reissuedToken = authService.reissueToken(accessToken, refreshToken);
        if (reissuedToken != null) {
            return ResponseEntity.status(HttpStatus.OK).body(reissuedToken.responseDto());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body("Token reissued fail. please Login again.")
            //    .build()
            ;
    }

    @Operation(summary = "로그아웃 API")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
        authService.logout(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body("Logout Success");
    }
}
