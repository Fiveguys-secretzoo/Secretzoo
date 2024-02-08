package com.ssafy.fiveguys.game.user.handler;

import com.ssafy.fiveguys.game.player.service.PlayerService;
import com.ssafy.fiveguys.game.user.dto.JwtTokenDto;
import com.ssafy.fiveguys.game.user.dto.UserDto;
import com.ssafy.fiveguys.game.user.entity.RefreshToken;
import com.ssafy.fiveguys.game.user.entity.User;
import com.ssafy.fiveguys.game.user.jwt.JwtProperties;
import com.ssafy.fiveguys.game.user.jwt.JwtTokenProvider;
import com.ssafy.fiveguys.game.user.service.RedisService;
import com.ssafy.fiveguys.game.user.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final RedisService redisService;
    private final PlayerService playerService;
    private final String CALLBACK_URL = "https://secretzoo.site/auth/callback";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

        JwtTokenDto tokenSet = jwtTokenProvider.generateToken(authentication);
        // DB에 Refreshtoken 저장
        UserDto user = userService.findUserById(authentication.getName());
        user.setRefreshToken(tokenSet.getRefreshToken());
        userService.saveUser(user);
        playerService.createPlayer(User.getUserDto(user));
        // Redis에 Refreshtoken 저장
        RefreshToken refreshToken = RefreshToken.builder()
            .userId(authentication.getName())
            .refreshToken(tokenSet.getRefreshToken())
            .build();
        redisService.saveRefreshToken(refreshToken.getUserId(), refreshToken.getRefreshToken());
        // token 쿼리스트링
        String targetUrl = UriComponentsBuilder.fromUriString(CALLBACK_URL)
            .queryParam(JwtProperties.ACCESS_TOKEN, tokenSet.getAccessToken())
            .queryParam(JwtProperties.REFRESH_TOKEN, tokenSet.getRefreshToken())
            .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

}
