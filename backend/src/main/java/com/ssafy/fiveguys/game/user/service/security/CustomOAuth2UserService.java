package com.ssafy.fiveguys.game.user.service.security;


import com.ssafy.fiveguys.game.player.service.PlayerService;
import com.ssafy.fiveguys.game.user.auth.GameUserDetails;
import com.ssafy.fiveguys.game.user.auth.userinfo.GoogleOAuth2UserInfo;
import com.ssafy.fiveguys.game.user.auth.userinfo.KakaoOAuth2UserInfo;
import com.ssafy.fiveguys.game.user.auth.userinfo.NaverOAuth2UserInfo;
import com.ssafy.fiveguys.game.user.auth.userinfo.Oauth2UserInfo;
import com.ssafy.fiveguys.game.user.dto.UserDto;
import com.ssafy.fiveguys.game.user.entity.User;
import com.ssafy.fiveguys.game.user.repository.UserRepositoy;

import java.util.Map;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepositoy userRepositoy;
    private static final String NAVER = "naver";
    private static final String KAKAO = "kakao";
    private final String GOOGLE = "google";
    private static final String GET_NAVER_ATTRIBUTE = "response";
    private final PlayerService playerService;
    private User user;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Oauth2UserInfo oauth2UserInfo = ofOAuth2UserInfo(registrationId, oAuth2User);
        Optional<User> optionalUser = userRepositoy.findByProviderAndProviderId(
            oauth2UserInfo.getProvider(), oauth2UserInfo.getProviderId());
        if (optionalUser.isPresent()) {
            UserDto userDto = UserDto.getUser(optionalUser.get());
            userDto.setEmail(oauth2UserInfo.getEmail());
            user = User.getUserDto(userDto);
        } else {
            user = User.builder()
                .userId(oauth2UserInfo.getProviderId())
                .email(oauth2UserInfo.getEmail())
                .name(oauth2UserInfo.getName())
                .nickname(oauth2UserInfo.getProvider() + "_" + oauth2UserInfo.getProviderId())
                .provider(oauth2UserInfo.getProvider())
                .providerId(oauth2UserInfo.getProviderId())
                .build();
        }

        userRepositoy.save(user);
        if (optionalUser.isEmpty()) {
            playerService.createPlayer(user);
        }
        return new GameUserDetails(user, oAuth2User.getAttributes());
    }

    private Oauth2UserInfo ofOAuth2UserInfo(String registrationId, OAuth2User oAuth2User) {
        if (registrationId.equals(GOOGLE)) {
            return new GoogleOAuth2UserInfo(oAuth2User.getAttributes());
        } else if (registrationId.equals(NAVER)) {
            return new NaverOAuth2UserInfo(
                (Map) oAuth2User.getAttributes().get(GET_NAVER_ATTRIBUTE));
        } else if (registrationId.equals(KAKAO)) {
            return new KakaoOAuth2UserInfo(oAuth2User.getAttributes());
        }
        return null;
    }
}
