package com.ssafy.fiveguys.game.player.config;//package com.example.ranking.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@EnableRedisRepositories
public class RedisRankingConfig {

    @Value("${spring.data.redis.port2}")
    private int port;

    @Value("${spring.data.redis.host2}")
    private String host;

    @Bean(name = "rankingRedisConnectionFactory")
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean(name = "rankingRedisTemplate")
    public RedisTemplate<String, String> redisTemplate() {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());//key 깨짐 방지
        redisTemplate.setValueSerializer(new StringRedisSerializer());//value 깨짐 방지
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        return redisTemplate;
    }
}
