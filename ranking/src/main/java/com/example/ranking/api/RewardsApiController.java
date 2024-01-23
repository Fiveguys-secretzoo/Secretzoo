package com.example.ranking.api;

import com.example.ranking.domain.Score;
import com.example.ranking.domain.dto.GameResult;
import com.example.ranking.repository.PlayerRepository;
import com.example.ranking.service.RankService;
import com.example.ranking.service.RewardsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/rewards")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RewardsApiController {

    private final RewardsService rewardsService;
    private final PlayerRepository playerRepository;


    /**
     * 사용자의 게임 결과에서 리워드(업적) 정보를 저장
     */
    @PostMapping("/save")
    public ResponseEntity<String> saveRewards(@RequestBody GameResult gameResult) {
//        log.info("gameResult = {}", gameResult);
//        //attack, defense, pass 점수 계산 로직으로 계산 후 Score 인스턴스로 만든 후에 rankService 에 저장해주기
//        double attackScore = Score.scoreCalculator(gameResult.getAttackAttempt(), gameResult.getAttackSuccess());
//        double defenseScore = Score.scoreCalculator(gameResult.getDefenseAttempt(), gameResult.getDefenseSuccess());
//        //pass 는 attempt 를 turn 으로, success 를 passCount 로 계산
//        double passScore = Score.scoreCalculator(gameResult.getTurn(), gameResult.getPassCount());
//        Score rankingScore = new Score(attackScore, defenseScore, passScore);
//        //playerId에 랭킹 정보 점수 저장
//        rankService.saveRank(gameResult.getPlayerId(), rankingScore);
        return ResponseEntity.ok("랭킹 정보가 성공적으로 저장되었습니다.");
    }


}
