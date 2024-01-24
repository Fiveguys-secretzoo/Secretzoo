package com.example.ranking.player.api;

import com.example.ranking.player.dto.AnimalDto;
import com.example.ranking.player.dto.GameResult;
import com.example.ranking.player.repository.PlayerRepository;
import com.example.ranking.player.service.RewardsService;
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
        log.info("gameResult = {}", gameResult);
        rewardsService.saveRewards(gameResult);
        return ResponseEntity.ok(" 성공적으로 저장되었습니다.");
    }
    @PostMapping("/save2")
    public ResponseEntity<String> saveRewards2(@RequestBody AnimalDto animalDto) {
        log.info("animalDto = {}", animalDto);
        rewardsService.saveRewards2(animalDto);
        return ResponseEntity.ok(" 성공적으로 저장되었습니다.");
    }


}
