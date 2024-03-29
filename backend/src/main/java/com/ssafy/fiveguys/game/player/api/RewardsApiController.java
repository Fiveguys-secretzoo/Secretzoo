package com.ssafy.fiveguys.game.player.api;

import com.ssafy.fiveguys.game.player.dto.animal.AnimalDto;
import com.ssafy.fiveguys.game.player.dto.RewardsDto;
import com.ssafy.fiveguys.game.player.dto.api.ApiResponse;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.entity.PlayerRewards;
import com.ssafy.fiveguys.game.player.service.AnimalRewardsService;
import com.ssafy.fiveguys.game.player.service.PlayerService;
import com.ssafy.fiveguys.game.player.service.RewardsService;
import com.ssafy.fiveguys.game.user.exception.UserNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;
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
@RequestMapping("/rewards")
@Tag(name = "RewardsApiController", description = "업적 관련 서비스 컨트롤러")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://secretzoo.site","http://localhost:3000"}, exposedHeaders = "*")
public class RewardsApiController {

    private final RewardsService rewardsService;
    private final AnimalRewardsService animalRewardsService;
    private final PlayerService playerService;


    @Operation(summary = "플레이어 업적 정보 저장 API")
    @PostMapping("/save")
    public ResponseEntity<String> saveRewards(@RequestBody AnimalDto animalDto) {
        log.debug("animalDto = {}", animalDto);
        rewardsService.saveRewards(animalDto);
        return ResponseEntity.status(HttpStatus.OK)
            .header(HttpHeaders.CONTENT_TYPE, "text/plain; charset=utf-8")
            .header(HttpHeaders.DATE, String.valueOf(ZonedDateTime.now(ZoneId.of("Asia/Seoul"))))
            .body("업적 정보가 성공적으로 저장되었습니다.");
    }

    @Operation(summary = "플레이어 완료 업적 조회 API")
    @GetMapping("/done/{userSequence}")
    public ApiResponse<?> getPlayerDoneRewards(@PathVariable("userSequence") Long userSequence) {

        Player player = playerService.getPlayerByUserSequence(userSequence);
        if(player == null) throw new UserNotFoundException();
        List<PlayerRewards> playerDoneRewards = animalRewardsService.getPlayerDoneRewards(userSequence);
        int totalPlayerCount = playerService.playerTotalCount();
        List<RewardsDto> collect = playerDoneRewards.stream()
            .map(m -> new RewardsDto(m.getPlayer().getPlayerSequence(), userSequence, m.getRewards(),
                m.getLastModifiedDate(), m.isDone(),
                animalRewardsService.getDoneRewardsCount(m.getRewards().getRewardsId())))
            .collect(Collectors.toList());

        return new ApiResponse<>(collect.size(), collect, totalPlayerCount);
    }

    @Operation(summary = "플레이어 미완료 업적 조회 API")
    @GetMapping("/not/done/{userSequence}")
    public ApiResponse<?> getPlayerNotDoneRewards(@PathVariable("userSequence") Long userSequence) {

        Player player = playerService.getPlayerByUserSequence(userSequence);
        if(player == null) throw new UserNotFoundException();
        List<PlayerRewards> playerNotDoneRewards = animalRewardsService.getPlayerNotDoneRewards(userSequence);
        int totalPlayerCount = playerService.playerTotalCount();
        List<RewardsDto> collect = playerNotDoneRewards.stream()
            .map(m -> new RewardsDto(m.getPlayer().getPlayerSequence(), userSequence, m.getRewards(),
                m.getLastModifiedDate(), m.isDone(),
                animalRewardsService.getDoneRewardsCount(m.getRewards().getRewardsId())))
            .collect(Collectors.toList());

        return new ApiResponse<>(collect.size(), collect, totalPlayerCount);
    }

    /**
     * 플레이어의 모든 업적 정보 조회
     */
    @Operation(summary = "플레이어 모든 업적 조회 API")
    @GetMapping("/total/{userSequence}")
    public ApiResponse<?> getTotalPlayerRewards(@PathVariable("userSequence") Long userSequence) {

        Player player = playerService.getPlayerByUserSequence(userSequence);
        if(player == null) throw new UserNotFoundException();
        List<PlayerRewards> playerDoneRewards = animalRewardsService.getPlayerAllRewards(userSequence);
        int totalPlayerCount = playerService.playerTotalCount();
        List<RewardsDto> collect = playerDoneRewards.stream()
            .map(m -> new RewardsDto(m.getPlayer().getPlayerSequence(), userSequence, m.getRewards(),
                m.getLastModifiedDate(), m.isDone(),
                animalRewardsService.getDoneRewardsCount(m.getRewards().getRewardsId())))
            .collect(Collectors.toList());

        return new ApiResponse<>(collect.size(), collect, totalPlayerCount);
    }
}
