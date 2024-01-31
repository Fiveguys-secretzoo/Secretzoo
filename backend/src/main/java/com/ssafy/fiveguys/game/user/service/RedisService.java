package com.ssafy.fiveguys.game.user.service;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private final String PREFIX = "refresh_token:{";
    private final String SUFFIX = "}";
    private final Long EXPIREATION_TIME = 60 * 24L; // 1day

    public void saveRefreshToken(String userId, String refreshToken) {
        redisTemplate.opsForValue().set(PREFIX + userId + SUFFIX, refreshToken, EXPIREATION_TIME,
            TimeUnit.MINUTES);
    }

    public String getRefreshToken(String userId) {
        return redisTemplate.opsForValue().get(PREFIX + userId + SUFFIX);
    }

    public void deleteRefreshToken(String userId) {
        redisTemplate.delete(PREFIX + userId + SUFFIX);
    }

}
