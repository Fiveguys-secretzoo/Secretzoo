package com.example.ranking;


import com.example.ranking.domain.Player;
import com.example.ranking.domain.Score;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class InitDB {

    private final InitService initService;
    private final RedisTemplate<String, String> redisTemplate;
    private String attackRankKey = "rank:attack";
    private String defenseRankKey = "rank:defense";
    private String passRankKey = "rank:pass";
    @PostConstruct
    public void init() {
        //redis 캐시 메모리 초기화
        redisTemplate.delete(attackRankKey);
        redisTemplate.delete(defenseRankKey);
        redisTemplate.delete(passRankKey);
        //dummy 데이터 추가
        initService.dbInit1();
        //더미 10만개 추가
//        initService.dbInit2();
    }


    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        private final EntityManager em;
        public void dbInit1() {
            //유저 생성
            Player player1 = Player.createPlayer("player1", "김재윤", "1234");
            Player player2 = Player.createPlayer("player2", "김기현", "1234");
            Player player3 = Player.createPlayer("player3", "전형욱", "1234");
            Player player4 = Player.createPlayer("player4", "김관우", "1234");
            Player player5 = Player.createPlayer("player5", "김중광", "1234");
            Player player6 = Player.createPlayer("player6", "조현수", "1234");
            Player player11 = Player.createPlayer("player11", "페이커", "1234");
            Player player22 = Player.createPlayer("player22", "구마유시", "1234");
            Player player33 = Player.createPlayer("player33", "케리아", "1234");
            Player player44 = Player.createPlayer("player44", "제우스", "1234");
            Player player55 = Player.createPlayer("player55", "오너", "1234");
            Player player66 = Player.createPlayer("player66", "기인", "1234");


            //점수 생성
            player1.setRankingScore(new Score(120.0, 20.0, 60.0));
            player2.setRankingScore(new Score(110.0, 120.0, 160.0));
            player3.setRankingScore(new Score(150.0, 420.0, 40.0));
            player4.setRankingScore(new Score(20.0, 50.0, 30.0));
            player5.setRankingScore(new Score(50.0, 30.0, 20.0));
            player6.setRankingScore(new Score(10.0, 121.0, 71.0));
            player11.setRankingScore(new Score(111.0, 150.0, 62.0));
            player22.setRankingScore(new Score(99.0, 44.0, 13.0));
            player33.setRankingScore(new Score(123.0, 33.0, 44.0));
            player44.setRankingScore(new Score(66.0, 55.0, 37.0));
            player55.setRankingScore(new Score(77.0, 32.0, 88.0));
            player66.setRankingScore(new Score(43.0, 12.0, 77.0));

            //DB 저장
            em.persist(player1);
            em.persist(player2);
            em.persist(player3);
            em.persist(player4);
            em.persist(player5);
            em.persist(player6);
            em.persist(player11);
            em.persist(player22);
            em.persist(player33);
            em.persist(player44);
            em.persist(player55);
            em.persist(player66);
        }

        public void dbInit2() {
            for (int i = 0; i < 100000; i++) {
                Player member = Player.createPlayer("member" + i, "name" + i, "pass" + i);// 예시: 간단한 루프를 통해 데이터 생성
                em.persist(member);

            }
        }

    }


}
