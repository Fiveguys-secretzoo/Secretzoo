package com.ssafy.fiveguys.game.player.api;

import com.ssafy.fiveguys.game.player.dto.AnimalDto;
import com.ssafy.fiveguys.game.player.dto.RewardsDto;
import com.ssafy.fiveguys.game.player.dto.api.ApiResponse;
import com.ssafy.fiveguys.game.player.entity.PlayerRewards;
import com.ssafy.fiveguys.game.player.service.AnimalRewardsService;
import com.ssafy.fiveguys.game.player.service.PlayerService;
import com.ssafy.fiveguys.game.player.service.RewardsService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequestMapping("/rewards")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RewardsApiController {

    private final RewardsService rewardsService;
    private final AnimalRewardsService animalRewardsService;
    private final PlayerService playerService;


    /**
     * 플레이어의 게임 결과에서 리워드(업적) 정보를 저장
     * gameResult로 받았을 때 처리할 수 있는지 검토 필요하기 때문에 주석 남겨놨음
     */
//    @PostMapping("/save")
//    public ResponseEntity<String> saveRewards(@RequestBody GameResult gameResult) {
//        log.info("gameResult = {}", gameResult);
//        rewardsService.saveRewardsTest(gameResult);
//        return ResponseEntity.ok(" 성공적으로 저장되었습니다.");
//    }

    /**
     * 플레이어의 게임 결과에서 리워드(업적) 정보를 저장
     */
    @PostMapping("/save")
    public ResponseEntity<String> saveRewards2(@RequestBody AnimalDto animalDto) {
        log.info("animalDto = {}", animalDto);
        rewardsService.saveRewards(animalDto);
        return ResponseEntity.ok(" 성공적으로 저장되었습니다.");
    }

    /**
     * 플레이어의 완료 업적 정보 조회
     */
    @GetMapping("/done/{userSequence}")
    public ApiResponse getPlayerRewards(@PathVariable("userSequence") Long userSequence) {
        List<PlayerRewards> playerDoneRewards = animalRewardsService.getPlayerDoneRewards(userSequence);
        int totalPlayerCount = playerService.playerTotalCount();


        List<RewardsDto> collect = playerDoneRewards.stream()
            .map(m -> new RewardsDto(m.getPlayer().getPlayerSequence(), m.getRewards(), m.getLastModifiedDate(), m.isDone(),
                animalRewardsService.getDoneRewardsCount(m.getRewards().getRewardsId())))
            .collect(Collectors.toList());

        return new ApiResponse(collect.size(), collect, totalPlayerCount);
    }

    /**
     * 플레이어의 모든 업적 정보 조회
     */
    @GetMapping("/total/{userSequence}")
    public ApiResponse getTotalPlayerRewards2(@PathVariable("userSequence") Long userSequence) {
        List<PlayerRewards> playerDoneRewards = animalRewardsService.getPlayerAllRewards(userSequence);

        int totalPlayerCount = playerService.playerTotalCount();


        List<RewardsDto> collect = playerDoneRewards.stream()
            .map(m -> new RewardsDto(m.getPlayer().getPlayerSequence(), m.getRewards(), m.getLastModifiedDate(), m.isDone(),
                animalRewardsService.getDoneRewardsCount(m.getRewards().getRewardsId())))
            .collect(Collectors.toList());

        return new ApiResponse(collect.size(), collect, totalPlayerCount);

    }


}
