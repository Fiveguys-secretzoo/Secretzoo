package com.ssafy.fiveguys.game.user.service;

import com.ssafy.fiveguys.game.user.dto.LoginRequestDto;
import com.ssafy.fiveguys.game.user.entity.RefreshToken;
import com.ssafy.fiveguys.game.user.entity.User;
import com.ssafy.fiveguys.game.user.exception.DuplicateIdentifierException;
import com.ssafy.fiveguys.game.user.exception.JwtBlackListException;
import com.ssafy.fiveguys.game.user.exception.RefreshTokenException;
import com.ssafy.fiveguys.game.user.jwt.JwtProperties;
import com.ssafy.fiveguys.game.user.jwt.JwtTokenProvider;
import com.ssafy.fiveguys.game.user.dto.JwtTokenDto;
import com.ssafy.fiveguys.game.user.dto.UserDto;
import com.ssafy.fiveguys.game.user.exception.PasswordException;
import com.ssafy.fiveguys.game.user.exception.UserNotFoundException;
import com.ssafy.fiveguys.game.user.repository.UserRepositoy;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.transaction.Transactional;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final UserRepositoy userRepositoy;
    private final RedisService redisService;
    private final JwtBlackListService jwtBlackListService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public JwtTokenDto login(LoginRequestDto loginDto) {
        UserDto user = userService.findUserById(loginDto.getUserId());
        if (user == null) {
            throw new UserNotFoundException("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new PasswordException("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
        // Login ID/PW를 기반으로 Authentication Token 생성
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
            = new UsernamePasswordAuthenticationToken(loginDto.getUserId(), loginDto.getPassword());
        // 실제로 검증이 이루어지는 부분
        Authentication authentication =
            authenticationManagerBuilder.getObject()
                .authenticate(usernamePasswordAuthenticationToken);
        // 인증 정보를 기반으로 JWT 토큰 생성
        SecurityContextHolder.getContext().setAuthentication(authentication);

        JwtTokenDto tokenSet = jwtTokenProvider.generateToken(authentication);
        // DB에 Refreshtoken 저장
        user.setRefreshToken(tokenSet.getRefreshToken());
        userService.saveUser(user);
        // RefreshToken Redis에 저장
        RefreshToken refreshToken = RefreshToken.builder()
            .userId(authentication.getName())
            .refreshToken(tokenSet.getRefreshToken())
            .build();

        redisService.saveRefreshToken(refreshToken.getUserId(), refreshToken.getRefreshToken());

        log.debug("RefreshToken in Redis = {}", refreshToken.getRefreshToken());

        return tokenSet;

    }


    public JwtTokenDto reissueToken(String accessToken, String refreshToken) {
        Authentication authentication = jwtTokenProvider.getAuthentication(
            jwtTokenProvider.resolveToken(accessToken));
        String principal = authentication.getName();
        String refreshTokenInDB = redisService.getRefreshToken(principal);
        log.debug("User Id = {}", principal);
        UserDto user = userService.findUserById(principal);
        if (refreshTokenInDB == null) { // Redis에 RT 없을 경우
            log.debug("Refresh Token is not in Redis.");
            refreshTokenInDB = user.getRefreshToken();
            if (refreshTokenInDB == null) { // MySQL에 RT 없을 경우
                log.debug("Refresh Token is not in MySQL.");
                throw new RefreshTokenException("refresh token 값이 존재하지 않습니다.");
            }
        }
        log.debug("Refresh Token in DB = {}", refreshTokenInDB);

        if (!refreshTokenInDB.equals(refreshToken)) {
            redisService.deleteRefreshToken(refreshToken);
            userService.deleteRefreshToken(principal);
            log.info("Refresh Token is not identical.");
            throw new RefreshTokenException("Refresh Token 값이 일치하지 않습니다.");
        }

        if (!jwtTokenProvider.validateToken(refreshToken)) {
            redisService.deleteRefreshToken(refreshToken);
            userService.deleteRefreshToken(principal);
            log.info("Refresh Token is invalidate.");
            throw new MalformedJwtException("유효하지 않은 토큰입니다.");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        if (redisService.getRefreshToken(refreshToken) != null) {
            // Redis에 저장되어 있는 RT 삭제
            redisService.deleteRefreshToken(refreshToken);
        }
        // 토큰 재발급
        JwtTokenDto reissueTokenDto = jwtTokenProvider.generateToken(authentication);

        String reissueRefreshToken = reissueTokenDto.getRefreshToken();
        // Redis, DB 에 새로 발급 받은 RT 저장
        redisService.saveRefreshToken(principal, reissueRefreshToken);

        log.debug("User Id = {}", principal);
        log.debug("RefreshToken save in Redis = {}", reissueTokenDto.getRefreshToken());

        user.setRefreshToken(reissueRefreshToken);
        userService.saveUser(user);
        return reissueTokenDto;
    }

    public void logout(String accessToken) {
        String token = jwtTokenProvider.resolveToken(accessToken);
        String principal = jwtTokenProvider.getAuthentication(token).getName();
        jwtBlackListService.saveJwtBlackList(token);
        redisService.deleteRefreshToken(principal);
        userService.deleteRefreshToken(principal);
    }


    public void idDuplicated(String userId) throws Exception {
        Optional<User> optionalUser = userRepositoy.findByUserId(userId);
        if (optionalUser.isPresent()) {
            throw new DuplicateIdentifierException("이미 존재하는 아이디입니다.");
        }
    }

    public long getTokenExpiration(String accessToken) {
        String token = jwtTokenProvider.resolveToken(accessToken);
        Claims claims = jwtTokenProvider.parseClaims(token);
        long tokenExpirationTime = claims.getExpiration().getTime();
        long remainingTime = tokenExpirationTime - System.currentTimeMillis();
        return remainingTime > 0 ? remainingTime : 0;
    }

    public void detectConcurrentUser(String requestAccessToken, String requestRefreshToken) {
        String accessToken = jwtTokenProvider.resolveToken(requestAccessToken);
        if (jwtBlackListService.hasJwtBlackList(accessToken)) {
            log.error("access token is in black list.");
            throw new JwtBlackListException("로그아웃 처리된 토큰입니다.");
        }
        log.debug("1. access token is validate.");

        String userId = jwtTokenProvider.extractUserId(requestAccessToken);
        log.debug("user id= {}", userId);

        User user = userRepositoy.findByUserId(userId).orElseThrow(
            UserNotFoundException::new);
        String refreshToken = user.getRefreshToken();

        if (!refreshToken.equals(requestRefreshToken)) {
            log.error("refresh token does not match in Database.");
            throw new RefreshTokenException("Refresh Token 값이 일치하지 않습니다.");
        }
        log.debug("2. refresh token is identical.");
    }
}

