package com.ssafy.fiveguys.game.player.api;

import com.ssafy.fiveguys.game.player.dto.AnimalDto;
import com.ssafy.fiveguys.game.player.dto.RewardsDto;
import com.ssafy.fiveguys.game.player.dto.response.Result2;
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
//    private final PlayerRepository playerRepository;


    /**
     * 플레이어의 게임 결과에서 리워드(업적) 정보를 저장
     */
//    @PostMapping("/save")
//    public ResponseEntity<String> saveRewards(@RequestBody GameResult gameResult) {
//        log.info("gameResult = {}", gameResult);
//        rewardsService.saveRewards(gameResult);
//        return ResponseEntity.ok(" 성공적으로 저장되었습니다.");
//    }

    /**
     * 플레이어의 게임 결과에서 리워드(업적) 정보를 저장
     */
    @PostMapping("/save")
    public ResponseEntity<String> saveRewards2(@RequestBody AnimalDto animalDto) {
        log.info("animalDto = {}", animalDto);
        rewardsService.saveRewards2(animalDto);
        return ResponseEntity.ok(" 성공적으로 저장되었습니다.");
    }

    /**
     * 플레이어의 완료 업적 정보 조회
     */
    @GetMapping("/done/{playerSequence}")
    public Result2 getPlayerRewards(@PathVariable("playerSequence") Long playerSequence) {
        List<PlayerRewards> playerDoneRewards = animalRewardsService.getPlayerDoneRewards(
            playerSequence);
        long totalPlayerCount = playerService.playerTotalCount();


//        List<RewardsDto> collect = playerDoneRewards.stream()
//            .map(m -> new RewardsDto(m.getPlayer().getPlayerSequence(), m.getRewards(), m.getLastModifiedDate(), m.isDone(), playerRewardsRepository.findDoneRewardsWithRewardsId(m.getRewards().getRewardsId())))
//            .collect(Collectors.toList());

        List<RewardsDto> collect = playerDoneRewards.stream()
            .map(m -> new RewardsDto(m.getPlayer().getPlayerSequence(), m.getRewards(), m.getLastModifiedDate(), m.isDone(),
                animalRewardsService.getDoneRewardsCount(m.getRewards().getRewardsId())))
            .collect(Collectors.toList());

        return new Result2(collect.size(), collect, totalPlayerCount);

    }
    /**
     * 플레이어의 모든 업적 정보 조회
     */
    @GetMapping("/total/{playerSequence}")
    public Result2 getTotalPlayerRewards(@PathVariable("playerSequence") Long playerSequence) {
        List<PlayerRewards> playerDoneRewards = animalRewardsService.getPlayerAllRewards(
            playerSequence);

        long totalPlayerCount = playerService.playerTotalCount();



//        List<RewardsDto> collect = playerDoneRewards.stream()
//            .map(m -> new RewardsDto(m.getPlayer().getPlayerSequence(), m.getRewards(), m.getLastModifiedDate(), m.isDone(),
//                playerRewardsRepository.findDoneRewardsWithRewardsId(m.getRewards().getRewardsId())))
//            .collect(Collectors.toList());

        List<RewardsDto> collect = playerDoneRewards.stream()
            .map(m -> new RewardsDto(m.getPlayer().getPlayerSequence(), m.getRewards(), m.getLastModifiedDate(), m.isDone(),
                animalRewardsService.getDoneRewardsCount(m.getRewards().getRewardsId())))
            .collect(Collectors.toList());

        return new Result2(collect.size(), collect, totalPlayerCount);

    }


}
