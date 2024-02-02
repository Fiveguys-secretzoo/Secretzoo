package com.ssafy.fiveguys.game.user.auth.userinfo;

import java.util.Map;

public class KakaoOAuth2UserInfo implements Oauth2UserInfo{
    private Map<String, Object> attributes;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        Map<String, Object> account=(Map<String, Object>) attributes.get("kakao_account");
        return (String) account.get("email");
    }

    @Override
    public String getName() {
        Map<String, Object> account=(Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile=(Map<String, Object>) account.get("profile");
        return (String) profile.get("nickname");
    }
}
