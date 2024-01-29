package com.ssafy.fiveguys.game.user.auth.userinfo;

public interface Oauth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
}
