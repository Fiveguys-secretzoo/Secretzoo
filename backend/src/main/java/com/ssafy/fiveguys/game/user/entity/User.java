package com.ssafy.fiveguys.game.user.entity;

import com.ssafy.fiveguys.game.common.entity.BaseTimeEntity;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.user.dto.Role;
import com.ssafy.fiveguys.game.user.dto.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Getter
@Entity
@Builder
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_sequence")
    private Long userSequence;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "password", nullable = false)
    @Builder.Default
    private String password = "1234";

    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String nickname;

    @Column(name = "main_reward")
    private String mainReward;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.USER;

    @Column(name = "profile_number")
    @Builder.Default
    private String profileNumber = "000";

    @Column(name = "provider")
    private String provider;

    @Column(name = "provider_id")
    private String providerId;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column
    @Builder.Default
    private boolean connection = false;

    @OneToOne(mappedBy = "user")
    private Player player;

    public void authorizeUser() {
        this.role = Role.USER;
    }

    public void passwordEncode(BCryptPasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public static User getUserDto(UserDto userDto) {
        return User.builder()
            .userSequence(userDto.getUserSequence())
            .userId(userDto.getUserId())
            .password(userDto.getPassword())
            .email(userDto.getEmail())
            .name(userDto.getName())
            .nickname(userDto.getNickname())
            .mainReward(userDto.getMainReward())
            .role(userDto.getRole())
            .profileNumber(userDto.getProfileNumber())
            .provider(userDto.getProvider())
            .providerId(userDto.getProviderId())
            .refreshToken(userDto.getRefreshToken())
            .connection(userDto.isConnection())
            .build();
    }
}
