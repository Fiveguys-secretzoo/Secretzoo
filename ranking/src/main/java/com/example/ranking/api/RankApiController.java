package com.example.ranking.api;

import com.example.ranking.domain.entity.Player;
import com.example.ranking.domain.Score;
import com.example.ranking.domain.dto.GameResult;
import com.example.ranking.repository.PlayerRepository;
import com.example.ranking.service.RankService;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("rank")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RankApiController {

    private final RankService rankService;
    private final PlayerRepository playerRepository;


    //초기 랭킹 정보 redis에 캐싱
    @GetMapping("/init")
    public ResponseEntity<?> init() {
        // 더미 데이터 초기화 (실제 운영에서는 필요 없음)
        List<Player> dummyData = new ArrayList<>();
        List<Player> members = playerRepository.findAll();

        for (Player member : members) {
            System.out.println("member = " + member);
        }
        log.info("dummy create");
        rankService.saveAll(members);
        return new ResponseEntity<List<Player>>(members, HttpStatus.OK);
    }

    /**
     * 사용자의 게임 결과에서 랭킹 정보를 저장
     */
    @PostMapping("/save")
    public ResponseEntity<String> saveRank(@RequestBody GameResult gameResult) {
        log.info("gameResult = {}", gameResult);
        //attack, defense, pass 점수 계산 로직으로 계산 후 Score 인스턴스로 만든 후에 rankService 에 저장해주기
        double attackScore = Score.scoreCalculator(gameResult.getAttackAttempt(), gameResult.getAttackSuccess());
        double defenseScore = Score.scoreCalculator(gameResult.getDefenseAttempt(), gameResult.getDefenseSuccess());
        //pass 는 attempt 를 turn 으로, success 를 passCount 로 계산
        double passScore = Score.scoreCalculator(gameResult.getTurn(), gameResult.getPassCount());
        Score rankingScore = new Score(attackScore, defenseScore, passScore);
        //playerId에 랭킹 정보 점수 저장
        rankService.saveRank(gameResult.getPlayerId(), rankingScore);
        return ResponseEntity.ok("랭킹 정보가 성공적으로 저장되었습니다.");
    }

    /**
     * 상위 N명의 랭킹 정보 조회(공격)
     */
    @GetMapping("/attack")
    public Result getAttackRanking() {
        Set<ZSetOperations.TypedTuple<String>> topRankings = rankService.getTopRankingsOfAttack();
        List<RankDto> collect = topRankings.stream()
            .map(m -> new RankDto(m.getValue(), m.getScore()))
            .collect(Collectors.toList());
        return new Result(collect.size(), collect);
    }
    /**
     * 상위 N명의 랭킹 정보 조회(방어)
     */
    @GetMapping("/defense")
    public Result getDefenseRanking() {
        Set<ZSetOperations.TypedTuple<String>> topRankings = rankService.getTopRankingsOfDefense();
        List<RankDto> collect = topRankings.stream()
            .map(m -> new RankDto(m.getValue(), m.getScore()))
            .collect(Collectors.toList());
        return new Result(collect.size(), collect);
    }
    /**
     * 상위 N명의 랭킹 정보 조회(패스)
     */
    @GetMapping("/pass")
    public Result getPassRanking() {
        Set<ZSetOperations.TypedTuple<String>> topRankings = rankService.getTopRankingsOfPass();
        List<RankDto> collect = topRankings.stream()
            .map(m -> new RankDto(m.getValue(), m.getScore()))
            .collect(Collectors.toList());
        return new Result(collect.size(), collect);
    }

    /**
     * 상위 5명의 랭킹 정보 조회(from DB)
     */
    @GetMapping("/total")
    public Result getTotalRanking() {
        List<Player> players1 = playerRepository.findTop10ByOrderByRankingScoreAttackScoreDesc();
        List<Player> players2 = playerRepository.findTop10ByOrderByRankingScoreDefenseScoreDesc();
        List<Player> players3 = playerRepository.findTop10ByOrderByRankingScorePassScoreDesc();
        int size = players1.size() + players2.size() + players3.size();

        List<RankDto> attack = players1.stream()
            .map(player -> new RankDto(player.getPlayerId(), player.getRankingScore().getAttackScore()))
            .toList();
        List<RankDto> defense = players2.stream()
            .map(player -> new RankDto(player.getPlayerId(), player.getRankingScore().getDefenseScore()))
            .toList();
        List<RankDto> pass = players3.stream()
            .map(player -> new RankDto(player.getPlayerId(), player.getRankingScore().getPassScore()))
            .toList();

        ConcurrentMap<String, List<RankDto>> rankMap = new ConcurrentHashMap<>();
        rankMap.put("attack", attack);
        rankMap.put("defense", defense);
        rankMap.put("pass", pass);
        return new Result(size, rankMap);
    }

    /**
     * playerId에 해당하는 유저의 순위 가져오기 (공격)
     */
    @GetMapping("/attack/{playerId}")
    public Long getPlayerRankingOfAttack(@PathVariable("playerId") String playerId) {
        return rankService.getPlayerRankingOfAttack(playerId);
    }
    /**
     * playerId에 해당하는 유저의 순위 가져오기 (방어)
     */
    @GetMapping("/defense/{playerId}")
    public Long getPlayerRankingOfDefense(@PathVariable("playerId") String playerId) {
        return rankService.getPlayerRankingOfDefense(playerId);
    }
    /**
     * playerId에 해당하는 유저의 순위 가져오기 (패스)
     */
    @GetMapping("/pass/{playerId}")
    public Long getPlayerRankingOfPass(@PathVariable("playerId") String playerId) {
        return rankService.getPlayerRankingOfPass(playerId);
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private int count;
        private T data;
    }

    @Data
    @AllArgsConstructor
    static class RankDto {
        private String playerId;
        private Double score;
    }

}
