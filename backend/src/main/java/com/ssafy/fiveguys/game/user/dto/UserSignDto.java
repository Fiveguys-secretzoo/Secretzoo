package com.ssafy.fiveguys.game.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class UserSignDto {
    private String userId;
    private String password;
    private String name;
    private String email;
    private String nickname;
}
