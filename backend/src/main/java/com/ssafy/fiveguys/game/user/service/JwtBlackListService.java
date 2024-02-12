package com.ssafy.fiveguys.game.user.service;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class JwtBlackListService {

    private final RedisTemplate<String, String> jwtBlackListRedisTemplate;
    private final AuthService authService;

    private final String SUFFIX = "}";
    private final String BL_PREFIX = "bl:{";

    public void saveJwtBlackList(String token) {
        long expirationTime = authService.getTokenExpiration(token);
        jwtBlackListRedisTemplate.opsForValue()
            .set(BL_PREFIX + token + SUFFIX, "logout", expirationTime,
                TimeUnit.MILLISECONDS);
    }

    public boolean hasJwtBlackList(String token) {
        return Boolean.TRUE.equals(jwtBlackListRedisTemplate.hasKey(BL_PREFIX + token + SUFFIX));
    }
}
