package com.ssafy.fiveguys.game.player.api;

import com.ssafy.fiveguys.game.player.dto.RankRequestDto;
import com.ssafy.fiveguys.game.player.dto.TotalRankDto;
import com.ssafy.fiveguys.game.player.dto.RankResponseDto;
import com.ssafy.fiveguys.game.player.dto.api.ApiResponse;
import com.ssafy.fiveguys.game.player.entity.embeddedType.AnimalScore;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.entity.embeddedType.RankingScore;
import com.ssafy.fiveguys.game.player.exception.UserException;
import com.ssafy.fiveguys.game.player.service.PlayerService;
import com.ssafy.fiveguys.game.player.service.RankService;
import com.ssafy.fiveguys.game.player.service.RewardsService;
import com.ssafy.fiveguys.game.user.repository.UserRepositoy;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
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
@RequestMapping("/rank")
@Tag(name = "RankApiController", description = "랭킹 관련 서비스 컨트롤러")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://secretzoo.site", "http://localhost:3000"}, exposedHeaders = "*")
public class RankApiController {

    private final RankService rankService;
    private final PlayerService playerService;
    private final RewardsService rewardsService;
    private final UserRepositoy userRepositoy; //실시간 랭킹의 성능을 위해 특수한 상황 repository 주입

    private final String attackRankKey = "rank:attack";
    private final String defenseRankKey = "rank:defense";
    private final String passRankKey = "rank:pass";


    /**
     * 사용자의 게임 결과에서 랭킹 정보를 저장
     */
    @Operation(summary = "랭킹 정보 저장 API")
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
        //player 기타 정보 저장
        playerService.savePlayer(rankRequestDto.getUserSequence(), rankRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
            .header(HttpHeaders.CONTENT_TYPE, "text/plain; charset=utf-8")
            .header(HttpHeaders.DATE, String.valueOf(ZonedDateTime.now(ZoneId.of("Asia/Seoul"))))
            .body("랭킹 정보가 성공적으로 저장되었습니다.");
    }

    /**
     * 상위 10명의 랭킹 정보 조회(공격) from redis
     */
    @Operation(summary = "공격 점수 상위 10명 조회 API")
    @GetMapping("/attack")
    public ApiResponse<?> getAttackRanking() {
        List<RankResponseDto> topAttack = rankService.getRanking(attackRankKey);
        int totalPlayerCount = playerService.playerTotalCount();
        return new ApiResponse<>(topAttack.size(), topAttack, totalPlayerCount);
    }
    /**
     * 상위 10명의 랭킹 정보 조회(공격) from redis
     */
    @Operation(summary = "방어 점수 상위 10명 조회 API")
    @GetMapping("/defense")
    public ApiResponse<?> getDefenseRanking() {
        List<RankResponseDto> topDefense = rankService.getRanking(defenseRankKey);
        int totalPlayerCount = playerService.playerTotalCount();
        return new ApiResponse<>(topDefense.size(), topDefense, totalPlayerCount);
    }
    /**
     * 상위 10명의 랭킹 정보 조회(공격) from redis
     */
    @Operation(summary = "패스 점수 상위 10명 조회 API")
    @GetMapping("/pass")
    public ApiResponse<?> getPassRanking() {
        List<RankResponseDto> topPass = rankService.getRanking(passRankKey);
        int totalPlayerCount = playerService.playerTotalCount();
        return new ApiResponse<>(topPass.size(), topPass, totalPlayerCount);
    }

    /**
     * 상위 10명의 랭킹 정보 조회(from redis)
     */
    @Operation(summary = "전체 점수 상위 10명 조회 API")
    @GetMapping("/total")
    public ApiResponse<?> getAllRanking() {

        List<RankResponseDto> topAttack = rankService.getRanking(attackRankKey);
        List<RankResponseDto> topDefense = rankService.getRanking(defenseRankKey);
        List<RankResponseDto> topPass = rankService.getRanking(passRankKey);

        int size = topAttack.size() + topDefense.size() + topPass.size();
        int totalPlayerCount = playerService.playerTotalCount();

        //Map 에 담아서 정보 반환
        ConcurrentMap<String, List<RankResponseDto>> rankMap = new ConcurrentHashMap<>();
        rankMap.put("attack", topAttack);
        rankMap.put("defense", topDefense);
        rankMap.put("pass", topPass);
        return new ApiResponse<>(size, rankMap, totalPlayerCount);
    }

    /**
     * 상위 10명의 랭킹 정보 조회(from DB)
     */
    @Operation(summary = "전체 점수 상위 10명 조회 API")
    @GetMapping("/db/total")
    public ApiResponse<?> getTotalRanking() {

        List<RankResponseDto> attack = rankService.getTotalRanking("attack");
        List<RankResponseDto> defense = rankService.getTotalRanking("defense");
        List<RankResponseDto> pass = rankService.getTotalRanking("pass");

        int size = attack.size() + defense.size() + pass.size();
        int totalPlayerCount = playerService.playerTotalCount();

        //Map 에 담아서 정보 반환
        ConcurrentMap<String, List<RankResponseDto>> rankMap = new ConcurrentHashMap<>();
        rankMap.put("attack", attack);
        rankMap.put("defense", defense);
        rankMap.put("pass", pass);
        return new ApiResponse<>(size, rankMap, totalPlayerCount);
    }

    /**
     * userSequence 에 해당하는 유저의 순위 가져오기 (공격)
     */
    @Operation(summary = "유저 공격 랭킹 조회 API")
    @GetMapping("/attack/{userSequence}")
    public int getPlayerRankingOfAttack(@PathVariable("userSequence") Long userSequence) {
        return rankService.getPlayerRanking(userSequence, attackRankKey);
    }

    /**
     * userSequence 해당하는 유저의 순위 가져오기 (방어)
     */
    @Operation(summary = "유저 방어 랭킹 조회 API")
    @GetMapping("/defense/{userSequence}")
    public int getPlayerRankingOfDefense(@PathVariable("userSequence") Long userSequence) {
        return rankService.getPlayerRanking(userSequence, defenseRankKey);
    }

    /**
     * userSequence 해당하는 유저의 순위 가져오기 (패스)
     */
    @Operation(summary = "유저 패스 랭킹 조회 API")
    @GetMapping("/pass/{userSequence}")
    public int getPlayerRankingOfPass(@PathVariable("userSequence") Long userSequence) {
        return rankService.getPlayerRanking(userSequence, passRankKey);
    }

    @GetMapping("/total/{userSequence}")
    public ApiResponse<?> getPlayerTotalRanking(@PathVariable("userSequence") Long userSequence) {

        int attack = rankService.getPlayerRanking(userSequence, attackRankKey);
        int defense = rankService.getPlayerRanking(userSequence, defenseRankKey);
        int pass = rankService.getPlayerRanking(userSequence, passRankKey);

        Player player = playerService.getPlayerByUserSequence(userSequence);
        if(player == null) throw new UserException();
        AnimalScore totalAnimalScore = rewardsService.getTotalAnimalScore(userSequence);
        TotalRankDto totalRankDto = new TotalRankDto(attack, defense, pass, player.getTotalPass(),
            totalAnimalScore);
        int totalPlayerCount = playerService.playerTotalCount();
        return new ApiResponse<>(3, totalRankDto, totalPlayerCount);
    }

}
