package com.ssafy.fiveguys.game.common.config;


import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.repository.PlayerRepository;
import com.ssafy.fiveguys.game.player.service.RankService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@EnableAsync
public class InitRedis {

    private final PlayerRepository playerRepository;
    private final RankService rankService;
    private final RedisTemplate<String, String> userRedisTemplate;
    private final RedisTemplate<String, String> rankingRedisTemplate;
    private final EntityManager entityManager;

    @Autowired
    public InitRedis(
        RedisTemplate<String, String> userRedisTemplate,
        @Qualifier("rankingRedisTemplate") RedisTemplate<String, String> rankingRedisTemplate,
        PlayerRepository playerRepository, RankService rankService, EntityManager entityManager) {
        this.userRedisTemplate = userRedisTemplate;
        this.rankingRedisTemplate = rankingRedisTemplate;
        this.playerRepository = playerRepository;
        this.rankService = rankService;
        this.entityManager = entityManager;
    }

    private final String attackRankKey = "rank:attack";
    private final String defenseRankKey = "rank:defense";
    private final String passRankKey = "rank:pass";

    @PostConstruct
    public void init() {
        log.info("서버 시작 후 DB init 작업");
        //redis 캐시 메모리 초기화
        rankingRedisTemplate.delete(attackRankKey);
        rankingRedisTemplate.delete(defenseRankKey);
        rankingRedisTemplate.delete(passRankKey);
        //DB 에서 player 데이터 가져오기
        List<Player> players = playerRepository.findAll();

        log.debug("players = {}", players);
        log.debug("Redis is updated from MySQL DB");

        // Redis 에 player 데이터 캐싱
        rankService.saveAll(players);

        // userRedis 캐시 메모리 초기화 해주기
        Objects.requireNonNull(userRedisTemplate.getConnectionFactory()).getConnection().flushAll();

        log.debug("DB 데이터 init 완료");
        // dummy 데이터 추가
        // initService.dbInit1();
        // 더미 10만개 추가
        // initService.dbInit2();
    }

//        public void dbInit2() {
//            for (int i = 0; i < 100000; i++) {
//                Player member = Player.createPlayer("member" + i, "name" + i, "pass" + i);// 예시: 간단한 루프를 통해 데이터 생성
//                em.persist(member);
//
//            }
//        }
//
//    }


}
