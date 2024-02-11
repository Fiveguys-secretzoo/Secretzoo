package com.ssafy.fiveguys.game.player.api;


import com.ssafy.fiveguys.game.player.dto.player.PlayerDetailDto;
import com.ssafy.fiveguys.game.player.dto.player.PlayerDto;
import com.ssafy.fiveguys.game.player.dto.api.ApiResponse;
import com.ssafy.fiveguys.game.player.dto.player.PlayerResult;
import com.ssafy.fiveguys.game.player.dto.player.PlayerSearch;
import com.ssafy.fiveguys.game.player.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Tag(name = "PlayerApiController", description = "플레이어 관련 서비스 컨트롤러")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://secretzoo.site", "http://localhost:3000"}, exposedHeaders = "*")
public class PlayerApiController {

    private final PlayerService playerService;


    /**
     * user sequence 로 player 정보조회
     *
     * @param userSequence
     * @return
     */
    @Operation(summary = "플레이어 한명 정보 조회 API")
    @GetMapping("/players/{userSequence}")
    public ApiResponse<?> getOnePlayerInfo(@PathVariable("userSequence") Long userSequence) {
//        Player player = playerService.getPlayerByUserSequence(userSequence);
//        // player sequence 가 db에 없는 경우 null 반환 -> 비회원 정보 조회 X
//        if (player == null) {
//            return null;
//        }
        int totalPlayerCount = playerService.playerTotalCount();
        PlayerDetailDto playerDto = playerService.getPlayer(userSequence);
        return new ApiResponse<>(1, playerDto, totalPlayerCount);
    }

    @Operation(summary = "전체 플레이어 정보 조회 API")
    @GetMapping("/players")
    public ApiResponse<?> getAllPlayerInfo(Pageable pageable) {
        List<PlayerDto> playerList = playerService.getAllPlayer(pageable);
        if (playerList.isEmpty()) {
            return null;
        }
        int totalPlayerCount = playerService.playerTotalCount();
        return new ApiResponse<>(playerList.size(), playerList, totalPlayerCount);
    }

    @Operation(summary = "플레이어 정보 검색 조회 API")
    @GetMapping("/players/search")
    public ApiResponse<?> SearchPlayerInfo(
        @ModelAttribute("playerSearch") PlayerSearch playerSearch, Pageable pageable) {
        log.info("controller : playerSearch={}", playerSearch);
        PlayerResult playerList = playerService.getAllPlayer(playerSearch, pageable);
        if (playerList.getPlayers().isEmpty()) {
            return null;
        }
        return new ApiResponse<>(playerList.getPlayers().size(), playerList.getPlayers(), playerList.getTotalCount());
    }

}
