package com.ssafy.fiveguys.game.player.service;


import com.ssafy.fiveguys.game.player.dto.rank.RankResponseDto;
import com.ssafy.fiveguys.game.player.dto.rank.RankSimpleDto;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.entity.embeddedType.RankingScore;
import com.ssafy.fiveguys.game.player.repository.PlayerRepository;
import com.ssafy.fiveguys.game.user.entity.User;
import com.ssafy.fiveguys.game.user.exception.UserNotFoundException;
import com.ssafy.fiveguys.game.user.repository.UserRepositoy;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.PriorityQueue;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
//@RequiredArgsConstructor
public class RankService {
    private final RedisTemplate<String, String> redisTemplate;
    private final PlayerRepository playerRepository;
    private final UserRepositoy userRepositoy;


    @Autowired
    public RankService(@Qualifier("rankingRedisTemplate") RedisTemplate<String, String> redisTemplate,
        PlayerRepository playerRepository, UserRepositoy userRepositoy) {
        this.redisTemplate = redisTemplate;
        this.playerRepository = playerRepository;
        this.userRepositoy = userRepositoy;

    }

    private final String attackRankKey = "rank:attack";
    private final String defenseRankKey = "rank:defense";
    private final String passRankKey = "rank:pass";

    @Value("${rank.update.interval.minutes}")
    private int updateIntervalMinutes;
    @Value("${rank.max.count}")
    private int maxRankingCount;


    /**
     * redis 에 player 의 랭킹 점수 정보 저장
     * @param players
     */
    @Transactional
    public void saveAll(List<Player> players) {
        for (Player player : players) {
            //각 플레이어의 공격, 방어, 패스 점수 redis 에 저장
            ZSetOperations<String, String> zSetForAttack = redisTemplate.opsForZSet();
            ZSetOperations<String, String> zSetForDefense = redisTemplate.opsForZSet();
            ZSetOperations<String, String> zSetForPass = redisTemplate.opsForZSet();
            zSetForAttack.add(attackRankKey, String.valueOf(player.getUser().getUserSequence()), player.getRankingScore().getAttackScore());
            zSetForDefense.add(defenseRankKey, String.valueOf(player.getUser().getUserSequence()), player.getRankingScore().getDefenseScore());
            zSetForPass.add(passRankKey, String.valueOf(player.getUser().getUserSequence()), player.getRankingScore().getPassScore());
        }
    }

    /**
     * attack 랭킹 점수를 Redis 에 저장(업데이트)
     */
    @Transactional
    public void saveRank(Long userSequence, RankingScore rankingScore) {

        //userSequence 에 해당하는 유저가 있는지 먼저 확인
        //select 쿼리 1번
        Player findPlayer = playerRepository.findByUser_UserSequence(userSequence);
        //user 가 없으면 뒤에 로직 실행하지 않을 것임 -> 비회원들의 랭킹과 점수 저장 로직 실행 X
        if(findPlayer == null) return;

        //redis 에서 각 랭킹 정보 가져오기
        ZSetOperations<String, String> zSetForAttack = redisTemplate.opsForZSet();
        ZSetOperations<String, String> zSetForDefense = redisTemplate.opsForZSet();
        ZSetOperations<String, String> zSetForPass = redisTemplate.opsForZSet();

        //redis 에 점수 업데이트
        zSetForAttack.incrementScore(attackRankKey, String.valueOf(userSequence), rankingScore.getAttackScore());
        zSetForDefense.incrementScore(defenseRankKey, String.valueOf(userSequence), rankingScore.getDefenseScore());
        zSetForPass.incrementScore(passRankKey, String.valueOf(userSequence), rankingScore.getPassScore());

        //DB에 업데이트
        findPlayer.setRankingScore(
            new RankingScore(
                findPlayer.getRankingScore().getAttackScore() + rankingScore.getAttackScore(),
                findPlayer.getRankingScore().getDefenseScore() + rankingScore.getDefenseScore(),
                findPlayer.getRankingScore().getPassScore() + rankingScore.getPassScore()
            )
        );
    }


    /**
     * player 전체 랭킹 조회 메서드 (from DB)
     * @param keywords
     * @return
     */
    public List<RankResponseDto> getTotalRanking(String keywords) {
        return switch (keywords) {
            case "attack" -> {
                List<Player> playerOfAttack = playerRepository.findTop10ByOrderByRankingScoreAttackScoreDesc();
                yield playerOfAttack.stream()
                    .map(player -> {
                        User user = userRepositoy.findByUserSequence(
                            player.getUser().getUserSequence());
                        return new RankResponseDto(user.getUserSequence(), user.getNickname(),
                            player.getRankingScore().getAttackScore(), player.getPlayerLevel().getLevel(),
                            player.getExp());
                    })
                    .toList();
            }
            case "defense" -> {
                List<Player> playerOfDefense = playerRepository.findTop10ByOrderByRankingScoreDefenseScoreDesc();
                yield playerOfDefense.stream()
                    .map(player -> {
                        User user = userRepositoy.findByUserSequence(
                            player.getUser().getUserSequence());
                        return new RankResponseDto(user.getUserSequence(), user.getNickname(),
                            player.getRankingScore().getAttackScore(), player.getPlayerLevel().getLevel(),
                            player.getExp());
                    })
                    .toList();
            }
            case "pass" -> {
                List<Player> playerOfPass = playerRepository.findTop10ByOrderByRankingScorePassScoreDesc();
                yield playerOfPass.stream()
                    .map(player -> {
                        User user = userRepositoy.findByUserSequence(
                            player.getUser().getUserSequence());
                        return new RankResponseDto(user.getUserSequence(), user.getNickname(),
                            player.getRankingScore().getAttackScore(), player.getPlayerLevel().getLevel(),
                            player.getExp());
                    })
                    .toList();
            }
            default -> new ArrayList<>();
        };
    }

    /**
     * 랭킹 정보를 redis 에서 조회 (상위 10명 반환)
     */
    public List<RankResponseDto> getRanking(String rankKey) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        Set<TypedTuple<String>> top10 = zSetOperations.reverseRangeWithScores(rankKey, 0, maxRankingCount - 1);
        assert top10 != null;
        //score -> level -> exp -> userSequence 순으로 내림차순 정렬(동점자 처리)
        Comparator<RankResponseDto> rankComparator = Comparator
            .comparingDouble(RankResponseDto::getScore)
            .thenComparingInt(RankResponseDto::getLevel)
            .thenComparingLong(RankResponseDto::getExp)
            .thenComparingLong(RankResponseDto::getUserSequence)
            .reversed();
        // 우선순위 큐 초기화
        PriorityQueue<RankResponseDto> priorityQueue = new PriorityQueue<>(rankComparator);
        // attackTop10을 우선순위 큐에 추가
        priorityQueue.addAll(top10.stream()
            .map(this::getExtraPlayerInfo)
            .toList());
        List<RankResponseDto> list = new ArrayList<>();
        // 큐에서 꺼내서 list 에 담고 return
        while (!priorityQueue.isEmpty()) list.add(priorityQueue.poll());
        return list;
    }

    /**
     * userSequence 랭킹 정보 조회
     */
    public RankSimpleDto getPlayerRanking(Long userSequence, String rankKey) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        Player player = playerRepository.findByUser_UserSequence(userSequence);
        // userSequence 가 null 인 경우 기본값으로 Optional.ofNullable 을 사용하여 0으로 설정
        int userRank = Math.toIntExact(Optional.ofNullable(String.valueOf(userSequence))
            .map(seq -> zSetOperations.reverseRank(rankKey, seq))
            .orElse(-1L));
        if(userRank == -1) throw new UserNotFoundException();
        return getRankSimpleDto(rankKey, userRank, player);
    }

    private RankSimpleDto getRankSimpleDto(String rankKey, int userRank, Player player) {
        if(userRank == -1) throw new UserNotFoundException();
        //redis 자료의 인덱스가 0부터 시작하므로 1을 더해 실제 랭킹을 표시
        double score = switch (rankKey) {
            case attackRankKey -> player.getRankingScore().getAttackScore();
            case defenseRankKey -> player.getRankingScore().getDefenseScore();
            case passRankKey -> player.getRankingScore().getPassScore();
            default -> 0;
        };
        return new RankSimpleDto(userRank, score);
    }

    /**
     * 랭킹 정보를 갱신하는 스케줄링 메서드
     * Redis 랭킹 점수 정보와 DB의 랭킹 점수 정보 정합성을 맞추는 작업
     */
    @Transactional
    //@Scheduled(fixedRateString = "${rank.update.interval}") //interval 방식의 스케줄링
    @Scheduled(cron = "0 59 23 * * *") // 특정 시간 기준 스케줄링 ex : 매월 매일 23시 59분 마다
    public void updateAllRanking() {

        log.debug("DB 랭킹 점수 갱신 시작");
        List<Player> players = playerRepository.findAll();
        //레디스의 점수 정보를 DB 정보에 업데이트
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        Set<TypedTuple<String>> typedTuplesForAttack = zSetOperations.reverseRangeWithScores(attackRankKey,0, - 1);
        Set<TypedTuple<String>> typedTuplesForDefense = zSetOperations.reverseRangeWithScores(defenseRankKey,0, - 1);
        Set<TypedTuple<String>> typedTuplesForPass = zSetOperations.reverseRangeWithScores(passRankKey,0, - 1);

        //attack, defense, pass 순으로 랭킹 점수 업데이트
        if(typedTuplesForAttack.size() != 0){
            for (TypedTuple<String> tuple : typedTuplesForAttack) {
                Player findPlayer = playerRepository.findByUser_UserSequence(Long.valueOf(tuple.getValue()));
                findPlayer.getRankingScore().setAttackScore(tuple.getScore());
            }
        }
        if(typedTuplesForDefense.size() != 0){
            for (TypedTuple<String> tuple : typedTuplesForDefense) {
                Player findPlayer = playerRepository.findByUser_UserSequence(Long.valueOf(tuple.getValue()));
                findPlayer.getRankingScore().setDefenseScore(tuple.getScore());
            }
        }
        if (typedTuplesForPass.size() != 0) {
            for (TypedTuple<String> tuple : typedTuplesForPass) {
                Player findPlayer = playerRepository.findByUser_UserSequence(Long.valueOf(tuple.getValue()));
                findPlayer.getRankingScore().setPassScore(tuple.getScore());
            }
        }
        log.debug("DB 랭킹 점수 갱신 완료");
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
            zSetOperations.add(attackRankKey, String.valueOf(player.getUser().getUserSequence()), player.getRankingScore().getAttackScore());
            zSetOperations.add(defenseRankKey, String.valueOf(player.getUser().getUserSequence()), player.getRankingScore().getDefenseScore());
            zSetOperations.add(passRankKey, String.valueOf(player.getUser().getUserSequence()), player.getRankingScore().getPassScore());
        }
        log.debug("redis 캐싱 랭킹 갱신 완료");
    }

    public void addNewPlayerRanking(Player player){
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        zSetOperations.add(attackRankKey, String.valueOf(player.getUser().getUserSequence()), 0.0);
        zSetOperations.add(defenseRankKey, String.valueOf(player.getUser().getUserSequence()), 0.0);
        zSetOperations.add(passRankKey, String.valueOf(player.getUser().getUserSequence()), 0.0);
    }


    /**
     * player 추가 정보 추출 메서드
     *
     * @param key
     * @return
     */
    private RankResponseDto getExtraPlayerInfo(TypedTuple<String> key) {
        User user = userRepositoy.findByUserSequence(
            Long.parseLong(Objects.requireNonNull(key.getValue())));
        return new RankResponseDto(Long.parseLong(key.getValue()), user.getNickname(),
            key.getScore(), user.getPlayer().getPlayerLevel().getLevel(), user.getPlayer().getExp());
    }
}
