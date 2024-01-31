package com.ssafy.fiveguys.game.user.service;

import com.ssafy.fiveguys.game.user.dto.LoginRequestDto;
import com.ssafy.fiveguys.game.user.entity.RefreshToken;
import com.ssafy.fiveguys.game.user.jwt.JwtProperties;
import com.ssafy.fiveguys.game.user.jwt.JwtTokenProvider;
import com.ssafy.fiveguys.game.user.dto.JwtTokenDto;
import com.ssafy.fiveguys.game.user.dto.UserDto;
import com.ssafy.fiveguys.game.user.exception.PasswordException;
import com.ssafy.fiveguys.game.user.exception.UserIdNotFoundException;
import com.ssafy.fiveguys.game.user.repository.RedisRepository;
import jakarta.transaction.Transactional;

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
    private final RedisService redisService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public JwtTokenDto login(LoginRequestDto loginDto) {
        UserDto user = userService.findUserById(loginDto.getUserId());
        if (user == null) {
            throw new UserIdNotFoundException("아이디 또는 비밀번호가 일치하지 않습니다.");
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
        System.out.println("tokenSet.getRefreshToken() = " + tokenSet.getRefreshToken());
        // DB에 Refreshtoken 저장
        user.setRefreshToken(tokenSet.getRefreshToken());
        userService.saveUser(user);
        // RefreshToken Redis에 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .userId(authentication.getName())
                .refreshToken(tokenSet.getRefreshToken())
                .expirationTime(60 * 24L) // 1일
                .build();

        redisService.saveRefreshToken(refreshToken.getUserId(), refreshToken.getRefreshToken());

        log.debug("User Id = {}", refreshToken.getUserId());
        log.debug("RefreshToken in Redis = {}", refreshToken.getRefreshToken());

        return tokenSet;

    }


    public JwtTokenDto reissueToken(String accessToken, String refreshToken) {
        Authentication authentication = jwtTokenProvider.getAuthentication(resolveToken(accessToken));
        String principal = authentication.getName();
        String refreshTokenInDB = redisService.getRefreshToken(principal);
        log.debug("User Id = {}", principal);
        log.debug("Get RefreshToken in Redis = {}", refreshTokenInDB);
        UserDto user = userService.findUserById(principal);
        if (refreshTokenInDB == null) { // Redis에 RT 없을 경우
            refreshTokenInDB = user.getRefreshToken();
        }
        if (!refreshTokenInDB.equals(refreshToken) || !jwtTokenProvider.validateToken(refreshToken)) {
            redisService.deleteRefreshToken(refreshToken);
            userService.deleteRefreshToken(principal);
            log.info("Delete token potentially hijacking");
            return null;
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Redis에 저장되어 있는 RT 삭제
        redisService.deleteRefreshToken(refreshToken);
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
        String token = resolveToken(accessToken);
        String principal = jwtTokenProvider.getAuthentication(token).getName();
        redisService.deleteRefreshToken(principal);
        userService.deleteRefreshToken(principal);
    }

    public String extractUserId(String accessToken) {
        String token = resolveToken(accessToken);
        return jwtTokenProvider.parseClaims(token).getSubject();
    }

    public String resolveToken(String accessToken) {
        if (accessToken != null && accessToken.startsWith(JwtProperties.TOKEN_PREFIX))
            return accessToken.substring(7);
        return null;
    }

    public boolean idDuplicated(String userId){
        return true;
    }
}

