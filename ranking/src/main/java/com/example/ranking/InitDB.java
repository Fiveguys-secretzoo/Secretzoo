package com.example.ranking;


import com.example.ranking.player.entity.Player;
import com.example.ranking.player.repository.PlayerRepository;
import com.example.ranking.player.service.RankService;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@EnableAsync
public class InitDB {

    private final PlayerRepository playerRepository;
    private final RankService rankService;
    private final RedisTemplate<String, String> redisTemplate;
    private final EntityManager em;
//    private final RedisRepository redisRepository;
//    private final LettuceConnectionFactory lettuceConnectionFactory;
    private String attackRankKey = "rank:attack";
    private String defenseRankKey = "rank:defense";
    private String passRankKey = "rank:pass";
    @PostConstruct
    public void init() {
        log.info("서버 시작 후 DB init 작업");
        //redis 캐시 메모리 초기화
        redisTemplate.delete(attackRankKey);
        redisTemplate.delete(defenseRankKey);
        redisTemplate.delete(passRankKey);

        //DB 에서 player 데이터 가져오기
        List<Player> players = playerRepository.findAll();

        log.info("players = {}", players);
        log.info("Redis is updated from MySQL DB");

        // Redis 에 player 데이터 캐싱
        rankService.saveAll(players);

        log.info("DB 데이터 init 완료");

        // dummy 데이터 추가
        // initService.dbInit1();
        // 더미 10만개 추가
        // initService.dbInit2();
    }


//    @Component
//    @Transactional
//    @RequiredArgsConstructor
//    static class InitService {
//
//        private final EntityManager em;
//        public void dbInit1() {
//            //유저 생성
//            Player player1 = Player.createPlayer("player1", "김재윤", "1234");
//            Player player2 = Player.createPlayer("player2", "김기현", "1234");
//            Player player3 = Player.createPlayer("player3", "전형욱", "1234");
//            Player player4 = Player.createPlayer("player4", "김관우", "1234");
//            Player player5 = Player.createPlayer("player5", "김중광", "1234");
//            Player player6 = Player.createPlayer("player6", "조현수", "1234");
//            Player player11 = Player.createPlayer("player11", "페이커", "1234");
//            Player player22 = Player.createPlayer("player22", "구마유시", "1234");
//            Player player33 = Player.createPlayer("player33", "케리아", "1234");
//            Player player44 = Player.createPlayer("player44", "제우스", "1234");
//            Player player55 = Player.createPlayer("player55", "오너", "1234");
//            Player player66 = Player.createPlayer("player66", "기인", "1234");
//
//            em.flush();
//
//            //점수 생성
//            player1.setRankingScore(new Score(120.0, 20.0, 60.0));
//            player2.setRankingScore(new Score(110.0, 120.0, 160.0));
//            player3.setRankingScore(new Score(150.0, 420.0, 40.0));
//            player4.setRankingScore(new Score(20.0, 50.0, 30.0));
//            player5.setRankingScore(new Score(50.0, 30.0, 20.0));
//            player6.setRankingScore(new Score(10.0, 121.0, 71.0));
//            player11.setRankingScore(new Score(111.0, 150.0, 62.0));
//            player22.setRankingScore(new Score(99.0, 44.0, 13.0));
//            player33.setRankingScore(new Score(123.0, 33.0, 44.0));
//            player44.setRankingScore(new Score(66.0, 55.0, 37.0));
//            player55.setRankingScore(new Score(77.0, 32.0, 88.0));
//            player66.setRankingScore(new Score(43.0, 12.0, 77.0));
//
//            //DB 저장
//            em.persist(player1);
//            em.persist(player2);
//            em.persist(player3);
//            em.persist(player4);
//            em.persist(player5);
//            em.persist(player6);
//            em.persist(player11);
//            em.persist(player22);
//            em.persist(player33);
//            em.persist(player44);
//            em.persist(player55);
//            em.persist(player66);
//
//
//            //동물 생성
//            Animal tiger = new Animal("TIGER01", "Tiger", "호랑이");
//            Animal cat = new Animal("CAT02", "Cat", "고양이");
//            Animal dog = new Animal("DOG03", "Dog", "강아지 ");
//            Animal deer = new Animal("DEER04", "Deer", "고라니");
//            Animal pig = new Animal("PIG05", "Pig", "돼지");
//            Animal fox = new Animal("FOX06", "Fox", "여우");
//            Animal sheep = new Animal("SHEEP07", "Sheep", "양");
//            Animal whale = new Animal("WHALE08", "Whale", "혹등고래");
//
//            em.persist(tiger);
//            em.persist(cat);
//            em.persist(dog);
//            em.persist(deer);
//            em.persist(pig);
//            em.persist(fox);
//            em.persist(sheep);
//            em.persist(whale);
//
//
//            //동물 업적 데이터
//            PlayerAnimal pa1 = new PlayerAnimal(player1, tiger, 10L, 10L, 5L, 0L, 1L, 100L, 12L, 99L);
//            PlayerAnimal pa2 = new PlayerAnimal(player1, cat, 101L, 10L, 5L, 0L, 1L, 100L, 12L, 99L);
//            PlayerAnimal pa3 = new PlayerAnimal(player1, dog, 120L, 10L, 5L, 0L, 1L, 100L, 12L, 99L);
//            PlayerAnimal pa4 = new PlayerAnimal(player1, whale, 11L, 10L, 5L, 0L, 1L, 100L, 12L, 99L);
//            PlayerAnimal pa6 = new PlayerAnimal(player3, sheep, 20L, 10L, 5L, 0L, 1L, 100L, 12L, 99L);
//            PlayerAnimal pa5 = new PlayerAnimal(player2, whale, 15L, 10L, 5L, 0L, 1L, 100L, 12L, 99L);
//
//            em.persist(pa1);
//            em.persist(pa2);
//            em.persist(pa3);
//            em.persist(pa4);
//            em.persist(pa5);
//            em.persist(pa6);
//
//
//        }
//
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
