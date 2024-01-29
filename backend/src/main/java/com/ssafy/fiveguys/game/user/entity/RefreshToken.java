package com.ssafy.fiveguys.game.user.entity;

import java.time.LocalDateTime;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@RedisHash(value = "refresh_token") // 14일
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    private String userId; // key
    private String refreshToken; // value
    @TimeToLive
    private Long expirationTime;

}
