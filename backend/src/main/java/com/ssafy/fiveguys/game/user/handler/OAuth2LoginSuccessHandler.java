package com.ssafy.fiveguys.game.user.handler;

import com.ssafy.fiveguys.game.user.auth.GameUserDetails;
import com.ssafy.fiveguys.game.user.dto.JwtTokenDto;
import com.ssafy.fiveguys.game.user.entity.RefreshToken;
import com.ssafy.fiveguys.game.user.jwt.JwtProperties;
import com.ssafy.fiveguys.game.user.jwt.JwtTokenProvider;
import com.ssafy.fiveguys.game.user.repository.RedisRepository;
import com.ssafy.fiveguys.game.user.repository.UserRepositoy;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepositoy userRepositoy;
    private final RedisRepository redisRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {
        System.out.println("OAuth2LoginSuccessHandler.onAuthenticationSuccess");
        JwtTokenDto tokenSet = jwtTokenProvider.generateToken(authentication);
        // DB에 Refreshtoken 저장 - 미구현
        // Redis에 Refreshtoken 저장
        RefreshToken refreshToken = RefreshToken.builder()
            .userId(authentication.getName())
            .refreshToken(tokenSet.getRefreshToken())
            .expirationTime(60 * 24L) // 1일
            .build();
        redisRepository.save(refreshToken);
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader(HttpHeaders.AUTHORIZATION,
            JwtProperties.TOKEN_PREFIX + tokenSet.getAccessToken());
        response.setHeader(JwtProperties.REFRESH_TOKEN, tokenSet.getRefreshToken());
        response.sendRedirect("http://localhost:3000/lobby");
    }
}
