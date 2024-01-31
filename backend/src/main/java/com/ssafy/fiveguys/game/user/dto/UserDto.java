package com.ssafy.fiveguys.game.user.dto;

import java.sql.Timestamp;

import com.ssafy.fiveguys.game.user.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long userSequence;
    private String userId;
    private String password;
    private String email;
    private String name;
    private String nickname;
    private String mainAchievement;
    private Role role;
    private String profileNumber;
    private String provider;
    private String providerId;
    private String refreshToken;
    private Timestamp creationDate;
    private Timestamp lastModifiedDate;

    public static UserDto getUser(User user) {
        return UserDto.builder()
                .userSequence(user.getUserSequence())
                .userId(user.getUserId())
                .password(user.getPassword())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .mainAchievement(user.getMainAchievement())
                .role(user.getRole())
                .profileNumber(user.getProfileNumber())
                .provider(user.getProvider())
                .providerId(user.getProviderId())
                .refreshToken(user.getRefreshToken())
                .creationDate(user.getCreationDate())
                .lastModifiedDate(user.getLastModifiedDate())
                .build();
    }
}
