package com.ssafy.fiveguys.game.user.dto;

import com.ssafy.fiveguys.game.user.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoDto {
    private String userId; // 변경불가
    private String email;   // 변경불가
    private String name;
    private String nickname;
    private String mainAchievement;
    private String profileNumber;
    private Long level;
    private Long point;

    public static UserInfoDto userInfoFromUserDto(UserDto userDto){
        return UserInfoDto.builder()
                .userId(userDto.getUserId())
                .email(userDto.getEmail())
                .name(userDto.getName())
                .nickname(userDto.getNickname())
                .mainAchievement(userDto.getMainAchievement())
                .profileNumber(userDto.getProfileNumber())
                .level(userDto.getLevel())
                .point(userDto.getPoint())
                .build();
    }

    public static UserInfoDto userInfoFromUser(User user){
        return UserInfoDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .mainAchievement(user.getMainAchievement())
                .profileNumber(user.getProfileNumber())
                .level(user.getLevel())
                .point(user.getPoint())
                .build();
    }
}
