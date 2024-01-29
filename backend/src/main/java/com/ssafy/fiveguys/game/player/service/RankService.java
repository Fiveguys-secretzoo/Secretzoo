package com.ssafy.fiveguys.game.player.service;


import com.example.ranking.player.entity.Player;
import com.example.ranking.player.entity.RankingScore;
import com.example.ranking.player.repository.PlayerRepository;
import jakarta.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RankService {

    private final RedisTemplate<String, String> redisTemplate;
    private final PlayerRepository playerRepository;
    private final EntityManager em;

    private String attackRankKey = "rank:attack";
    private String defenseRankKey = "rank:defense";
    private String passRankKey = "rank:pass";

    @Value("${rank.update.interval.minutes}")
    private int updateIntervalMinutes; // application.properties에 설정된 값

    @Value("${rank.max.count}")
    private int maxRankingCount; // application.properties에 설정된 값


    /**
     * redis에 player의 랭킹 점수 정보 저장
     * @param players
     */
    public void saveAll(List<Player> players) {
        for (Player player : players) {

            //각 플레이어의 공격, 방어, 패스 점수 redis에 저장
            ZSetOperations<String, String> zSetForAttack = redisTemplate.opsForZSet();
            ZSetOperations<String, String> zSetForDefense = redisTemplate.opsForZSet();
            ZSetOperations<String, String> zSetForPass = redisTemplate.opsForZSet();
            zSetForAttack.add(attackRankKey, player.getPlayerId(), player.getRankingScore().getAttackScore());
            zSetForDefense.add(defenseRankKey, player.getPlayerId(), player.getRankingScore().getDefenseScore());
            zSetForPass.add(passRankKey, player.getPlayerId(), player.getRankingScore().getPassScore());
        }
    }

    /**
     * attack 랭킹 점수를 Redis 에 저장(업데이트)
     */
    @Transactional
    public void saveRank(String playerId, RankingScore rankingScore) {
        //redis 에서 각 랭킹 정보 가져오기
        ZSetOperations<String, String> zSetForAttack = redisTemplate.opsForZSet();
        ZSetOperations<String, String> zSetForDefense = redisTemplate.opsForZSet();
        ZSetOperations<String, String> zSetForPass = redisTemplate.opsForZSet();

        //redis 에 점수 업데이트
        zSetForAttack.incrementScore(attackRankKey, playerId, rankingScore.getAttackScore());
        zSetForDefense.incrementScore(defenseRankKey, playerId, rankingScore.getDefenseScore());
        zSetForPass.incrementScore(passRankKey, playerId, rankingScore.getPassScore());

        //DB에 업데이트

        //점수
        Player findPlayer = playerRepository.findByPlayerId(playerId);
        findPlayer.setRankingScore(
            new RankingScore(
                findPlayer.getRankingScore().getAttackScore() + rankingScore.getAttackScore(),
                findPlayer.getRankingScore().getDefenseScore() + rankingScore.getDefenseScore(),
                findPlayer.getRankingScore().getPassScore() + rankingScore.getPassScore()
            )
        );

    }

    public List<Player> getTotalRanking(String keywords) {

        List<Player> players;
        switch (keywords) {
            case "attack":
                players = playerRepository.findTop10ByOrderByRankingScoreAttackScoreDesc();
                break;
            case "defense":
                players = playerRepository.findTop10ByOrderByRankingScoreDefenseScoreDesc();
                break;
            case "pass":
                players = playerRepository.findTop10ByOrderByRankingScorePassScoreDesc();
                break;
            default:
                players = new ArrayList<>();
        }

        return players;
    }

    /**
     * attack 랭킹 정보를 redis 에서 조회 (상위 N명 반환)
     */
    public Set<TypedTuple<String>> getTopRankingsOfAttack() {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        // 상위 N명의 랭킹을 조회하며, 점수가 높은 순으로 반환
        return zSetOperations.reverseRangeWithScores(attackRankKey, 0, maxRankingCount - 1);
    }
    /**
     * defense 랭킹 정보를 redis 에서 조회 (상위 N명 반환)
     */
    public Set<TypedTuple<String>> getTopRankingsOfDefense() {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        // 상위 N명의 랭킹을 조회하며, 점수가 높은 순으로 반환
        return zSetOperations.reverseRangeWithScores(defenseRankKey, 0, maxRankingCount - 1);
    }
    /**
     * pass 랭킹 정보를 redis 에서 조회 (상위 N명 반환)
     */
    public Set<TypedTuple<String>> getTopRankingsOfPass() {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        // 상위 N명의 랭킹을 조회하며, 점수가 높은 순으로 반환
        return zSetOperations.reverseRangeWithScores(passRankKey, 0, maxRankingCount - 1);
    }

    /**
     * playerId의 attack 랭킹 정보 조회
     */
    public Long getPlayerRankingOfAttack(String playerId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        // 랭킹은 0부터 시작하므로 1을 더해 실제 랭킹을 계산
        //playerId가 null이면 NullPointer Exception
//        return zSetOperations.reverseRank(attackRankKey, Objects.requireNonNull(playerId)) + 1;
        // playerId가 null인 경우 기본값으로 Optional.ofNullable을 사용하여 0으로 설정
        Long userRank = Optional.ofNullable(playerId)
            .map(id -> zSetOperations.reverseRank(attackRankKey, id))
            .orElse(-1L);

        return userRank+1;
    }

    /**
     * playerId의 defense 랭킹 정보 조회
     */
    public Long getPlayerRankingOfDefense(String playerId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        // 랭킹은 0부터 시작하므로 1을 더해 실제 랭킹을 계산
        // playerId가 null인 경우 기본값으로 Optional.ofNullable을 사용하여 0으로 설정
        Long userRank = Optional.ofNullable(playerId)
            .map(id -> zSetOperations.reverseRank(defenseRankKey, id))
            .orElse(-1L);

        return userRank+1;
    }

    /**
     * playerId의 pass 랭킹 정보 조회
     */
    public Long getPlayerRankingOfPass(String playerId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        // 랭킹은 0부터 시작하므로 1을 더해 실제 랭킹을 계산
        // playerId가 null인 경우 기본값으로 Optional.ofNullable을 사용하여 0으로 설정
        Long userRank = Optional.ofNullable(playerId)
            .map(id -> zSetOperations.reverseRank(passRankKey, id))
            .orElse(-1L);

        return userRank+1;
    }



    /**
     * 랭킹 정보를 주기적으로 갱신하는 스케줄링 메서드
     */

    @Transactional
//    @Scheduled(fixedRateString = "${rank.update.interval}") //interval 방식의 스케줄링
    @Scheduled(cron = "0 59 23 * * *") // 특정 시간 기준 스케줄링 ex : 매월 매일 23시 59분 마다
    public void updateAllRanking() {
        log.info("DB 랭킹 점수 갱신 시작");
        List<Player> players = playerRepository.findAll();
        //레디스의 점수 정보를 DB 정보에 업데이트
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        Set<TypedTuple<String>> typedTuplesForAttack = zSetOperations.reverseRangeWithScores(attackRankKey,0, - 1);
        Set<TypedTuple<String>> typedTuplesForDefense = zSetOperations.reverseRangeWithScores(defenseRankKey,0, - 1);
        Set<TypedTuple<String>> typedTuplesForPass = zSetOperations.reverseRangeWithScores(passRankKey,0, - 1);

        //attack, defense, pass 순으로 랭킹 점수 업데이트
        if(typedTuplesForAttack.size() != 0){
            for (TypedTuple<String> tuple : typedTuplesForAttack) {
                Player findPlayer = playerRepository.findByPlayerId(tuple.getValue());
                findPlayer.getRankingScore().setAttackScore(tuple.getScore());
            }
        }
        if(typedTuplesForDefense.size() != 0){
            for (TypedTuple<String> tuple : typedTuplesForDefense) {
                Player findPlayer = playerRepository.findByPlayerId(tuple.getValue());
                findPlayer.getRankingScore().setDefenseScore(tuple.getScore());
            }
        }

        if (typedTuplesForPass.size() != 0) {
            for (TypedTuple<String> tuple : typedTuplesForPass) {
                Player findPlayer = playerRepository.findByPlayerId(tuple.getValue());
                findPlayer.getRankingScore().setPassScore(tuple.getScore());
            }
        }
//        em.flush();
        log.info("DB 랭킹 점수 갱신 완료");
        updateRedisRanking(players);
    }

    /**
     * redis의 랭킹 캐싱 정보를 DB에서 다시 불러와서 업데이트 하는 메서드
     */
    public void updateRedisRanking(List<Player> players) {
        log.info("Redis 캐싱 초기화");
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        // Redis의 랭킹 캐시를 모두 초기화
        zSetOperations.removeRange(attackRankKey, 0, -1);
        zSetOperations.removeRange(defenseRankKey, 0, -1);
        zSetOperations.removeRange(passRankKey, 0, -1);

        // 업데이트된 랭킹 정보를 Redis에 추가
        for (Player player : players) {
            zSetOperations.add(attackRankKey, player.getPlayerId(), player.getRankingScore().getAttackScore());
            zSetOperations.add(defenseRankKey, player.getPlayerId(), player.getRankingScore().getDefenseScore());
            zSetOperations.add(passRankKey, player.getPlayerId(), player.getRankingScore().getPassScore());
        }
        log.info("redis 캐싱 랭킹 갱신 완료");
    }


}
