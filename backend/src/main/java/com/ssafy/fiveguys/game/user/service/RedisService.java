package com.ssafy.fiveguys.game.user.service;

import com.ssafy.fiveguys.game.user.jwt.JwtTokenProvider;
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
public class RedisService {

    private final RedisTemplate<String, String> refreshTokenRedisTemplate;
    private final RedisTemplate<String, String> verificationCodeRedisTemplate;
    private final RedisTemplate<String, String> jwtBlackListRedisTemplate;
    private final JwtTokenProvider jwtTokenProvider;
    private final String RT_PREFIX = "rt:{";
    private final String VC_PREFIX = "vc:{";
    private final String SUFFIX = "}";
    private final String BL_PREFIX = "bl:{";
    private final Long RT_EXPIREATION_TIME = 60 * 24L; // 1day
    private final Long VC_EXPIREATION_TIME = 10L; // 10분

    public void saveRefreshToken(String userId, String refreshToken) {
        refreshTokenRedisTemplate.opsForValue()
            .set(RT_PREFIX + userId + SUFFIX, refreshToken, RT_EXPIREATION_TIME,
                TimeUnit.MINUTES);
    }

    public String getRefreshToken(String userId) {
        return refreshTokenRedisTemplate.opsForValue().get(RT_PREFIX + userId + SUFFIX);
    }

    public void deleteRefreshToken(String userId) {
        refreshTokenRedisTemplate.delete(RT_PREFIX + userId + SUFFIX);
    }

    public void saveVerificationCode(String email, String verificationCode) {
        verificationCodeRedisTemplate.opsForValue()
            .set(VC_PREFIX + email + SUFFIX, verificationCode, VC_EXPIREATION_TIME,
                TimeUnit.MINUTES);
    }

    public String getVerificationCode(String email) {
        return verificationCodeRedisTemplate.opsForValue().get(VC_PREFIX + email + SUFFIX);
    }

    public void deleteVerificationCode(String email) {
        verificationCodeRedisTemplate.delete(VC_PREFIX + email + SUFFIX);
    }

    public void saveJwtBlackList(String token) {
        long expirationTime = jwtTokenProvider.getTokenExpiration(token);
        jwtBlackListRedisTemplate.opsForValue()
            .set(BL_PREFIX + token + SUFFIX, "logout", expirationTime,
                TimeUnit.MILLISECONDS);
    }

    public boolean hasJwtBlackList(String token) {
        return Boolean.TRUE.equals(jwtBlackListRedisTemplate.hasKey(BL_PREFIX + token + SUFFIX));
    }
}
