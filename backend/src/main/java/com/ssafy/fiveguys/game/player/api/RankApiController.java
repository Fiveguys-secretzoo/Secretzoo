package com.ssafy.fiveguys.game.player.api;

import com.ssafy.fiveguys.game.player.dto.RankRequestDto;
import com.ssafy.fiveguys.game.player.dto.TotalRankDto;
import com.ssafy.fiveguys.game.player.dto.RankResponseDto;
import com.ssafy.fiveguys.game.player.dto.api.ApiResponse;
import com.ssafy.fiveguys.game.player.entity.AnimalScore;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.entity.RankingScore;
import com.ssafy.fiveguys.game.player.entity.Rewards;
import com.ssafy.fiveguys.game.player.service.PlayerService;
import com.ssafy.fiveguys.game.player.service.RankService;
import com.ssafy.fiveguys.game.player.service.RewardsService;
import com.ssafy.fiveguys.game.user.entity.User;
import com.ssafy.fiveguys.game.user.repository.UserRepositoy;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ZSetOperations;
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
@RequestMapping("/rank")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RankApiController {

    private final RankService rankService;
    private final PlayerService playerService;
    private final RewardsService  rewardsService;
    private final UserRepositoy userRepositoy; //실시간 랭킹의 성능을 위해 특수한 상황 repository 주입

    /**
     * 사용자의 게임 결과에서 랭킹 정보를 저장
     */
    @PostMapping("/save")
    public ResponseEntity<String> saveRank(@RequestBody RankRequestDto rankRequestDto) {
        log.info("rankRequestDto = {}", rankRequestDto);
        //attack, defense, pass 점수 계산 로직으로 계산 후 Score 인스턴스로 만든 후에 rankService 에 저장해주기
        double attackScore = RankingScore.scoreCalculator(rankRequestDto.getAttackAttempt(),
            rankRequestDto.getAttackSuccess());
        double defenseScore = RankingScore.scoreCalculator(rankRequestDto.getDefenseAttempt(),
            rankRequestDto.getDefenseSuccess());
        //pass 는 attempt 를 turn 으로, success 를 passCount 로 계산
        double passScore = RankingScore.scoreCalculator(rankRequestDto.getTurn(),
            rankRequestDto.getPassCount());
        RankingScore rankingScore = new RankingScore(attackScore, defenseScore, passScore);
        //redis 에 랭킹 정보 점수 저장
        rankService.saveRank(rankRequestDto.getUserSequence(), rankingScore);

        //player pass count 저장
        playerService.savePassCount(rankRequestDto.getUserSequence(), rankRequestDto.getPassCount());

        int totalSuccess = (int) (rankRequestDto.getAttackSuccess() + rankRequestDto.getDefenseSuccess());
        //player 경험지 점수 저장
        playerService.saveExp(rankRequestDto.getUserSequence(), rankRequestDto.getTurn(), totalSuccess);

        return ResponseEntity.ok("랭킹 정보가 성공적으로 저장되었습니다.");
    }

    /**
     * 상위 10명의 랭킹 정보 조회(공격)
     */
    @GetMapping("/attack")
    public ApiResponse getAttackRanking() {
        Set<ZSetOperations.TypedTuple<String>> topRankings = rankService.getTopRankingsOfAttack();
        List<RankResponseDto> collect = topRankings.stream()
            .map(m -> {
                User user = userRepositoy.findByUserSequence(Long.parseLong(m.getValue()));
                return new RankResponseDto(Long.parseLong(m.getValue()), user.getNickname(), m.getScore());
            })
            .collect(Collectors.toList());

        int totalPlayerCount = playerService.playerTotalCount();

        return new ApiResponse(collect.size(), collect, totalPlayerCount);
    }

    /**
     * 상위 10명의 랭킹 정보 조회(방어)
     */
    @GetMapping("/defense")
    public ApiResponse getDefenseRanking() {
        Set<ZSetOperations.TypedTuple<String>> topRankings = rankService.getTopRankingsOfDefense();
        List<RankResponseDto> collect = topRankings.stream()
            .map(m -> {
                User user = userRepositoy.findByUserSequence(Long.parseLong(m.getValue()));
                return new RankResponseDto(Long.parseLong(m.getValue()), user.getNickname(), m.getScore());
            })
            .collect(Collectors.toList());

        int totalPlayerCount = playerService.playerTotalCount();

        return new ApiResponse(collect.size(), collect, totalPlayerCount);
    }

    /**
     * 상위 10명의 랭킹 정보 조회(패스)
     */
    @GetMapping("/pass")
    public ApiResponse getPassRanking() {
        Set<ZSetOperations.TypedTuple<String>> topRankings = rankService.getTopRankingsOfPass();
        List<RankResponseDto> collect = topRankings.stream()
            .map(m -> {
                User user = userRepositoy.findByUserSequence(Long.parseLong(m.getValue()));
                return new RankResponseDto(Long.parseLong(m.getValue()), user.getNickname(), m.getScore());
            })
            .collect(Collectors.toList());

        int totalPlayerCount = playerService.playerTotalCount();

        return new ApiResponse(collect.size(), collect, totalPlayerCount);
    }


    /**
     * 상위 10명의 랭킹 정보 조회(from DB)
     */
    @GetMapping("/total")
    public ApiResponse getTotalRanking() {

        List<Player> players1 = rankService.getTotalRanking("attack");
        List<Player> players2 = rankService.getTotalRanking("defense");
        List<Player> players3 = rankService.getTotalRanking("pass");

        int size = players1.size() + players2.size() + players3.size();

        int totalPlayerCount = playerService.playerTotalCount();

        List<RankResponseDto> attack = players1.stream()
            .map(player -> {
                User user = userRepositoy.findByUserSequence(player.getUserSequence());
                return new RankResponseDto(user.getUserSequence(),
                    user.getNickname(),
                    player.getRankingScore().getAttackScore());
            })
            .toList();
        List<RankResponseDto> defense = players2.stream()
            .map(player -> {
                User user = userRepositoy.findByUserSequence(player.getUserSequence());
                return new RankResponseDto(user.getUserSequence(),
                    user.getNickname(),
                    player.getRankingScore().getAttackScore());
            })
            .toList();
        List<RankResponseDto> pass = players3.stream()
            .map(player -> {
                User user = userRepositoy.findByUserSequence(player.getUserSequence());
                return new RankResponseDto(user.getUserSequence(),
                    user.getNickname(),
                    player.getRankingScore().getAttackScore());
            })
            .toList();


        ConcurrentMap<String, List<RankResponseDto>> rankMap = new ConcurrentHashMap<>();
        rankMap.put("attack", attack);
        rankMap.put("defense", defense);
        rankMap.put("pass", pass);
        return new ApiResponse(size, rankMap, totalPlayerCount);
    }

    /**
     * userSequence 에 해당하는 유저의 순위 가져오기 (공격)
     */
    @GetMapping("/attack/{userSequence}")
    public int getPlayerRankingOfAttack(@PathVariable("userSequence") Long userSequence) {
        return rankService.getPlayerRankingOfAttack(userSequence);
    }

    /**
     * userSequence 해당하는 유저의 순위 가져오기 (방어)
     */
    @GetMapping("/defense/{userSequence}")
    public int getPlayerRankingOfDefense(@PathVariable("userSequence") Long userSequence) {
        return rankService.getPlayerRankingOfDefense(userSequence);
    }

    /**
     * userSequence 해당하는 유저의 순위 가져오기 (패스)
     */
    @GetMapping("/pass/{userSequence}")
    public int getPlayerRankingOfPass(@PathVariable("userSequence") Long userSequence) {
        return rankService.getPlayerRankingOfPass(userSequence);
    }

    @GetMapping("/total/{userSequence}")
    public ApiResponse getPlayerTotalRanking(@PathVariable("userSequence") Long userSequence) {

        int attack = rankService.getPlayerRankingOfAttack(userSequence);
        int defense = rankService.getPlayerRankingOfDefense(userSequence);
        int pass = rankService.getPlayerRankingOfPass(userSequence);
        Player player = playerService.getPlayerBySequence(userSequence);

        AnimalScore totalAnimalScore = rewardsService.getTotalAnimalScore(userSequence);
        TotalRankDto totalRankDto = new TotalRankDto(attack, defense, pass, player.getTotalPass(), totalAnimalScore);
        int totalPlayerCount = playerService.playerTotalCount();

        return new ApiResponse(3, totalRankDto, totalPlayerCount);
    }
}
