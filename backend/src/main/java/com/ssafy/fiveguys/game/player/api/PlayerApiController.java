package com.ssafy.fiveguys.game.player.api;



import com.ssafy.fiveguys.game.player.dto.PlayerDto;
import com.ssafy.fiveguys.game.player.dto.api.ApiResponse;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/player")
@Tag(name = "PlayerApiController", description = "플레이어 관련 서비스 컨트롤러")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://secretzoo.site","http://localhost:3000"}, exposedHeaders = "*")
public class PlayerApiController {

    private final PlayerService playerService;


    /**
     * user sequence 로 player 정보조회
     * @param userSequence
     * @return
     */
    @Operation(summary = "플레이어 정보 조회 API")
    @GetMapping("/{userSequence}")
    public ApiResponse<?> getPlayerInfo(@PathVariable("userSequence") Long userSequence) {

        Player player = playerService.getPlayerBySequence(userSequence);
        // player sequence 가 db에 없는 경우 null 반환 -> 비회원 정보 조회 X
        if(player == null) return null;

        int totalPlayerCount = playerService.playerTotalCount();
        //player 정보 조회에 필요한 데이터 dto 에 담기
        PlayerDto playerDto = new PlayerDto(
            userSequence, player.getTotalRound(), player.getTotalTurn(),
            player.getRankingScore(), player.getExp(), player.getPlayerLevel());

        return new ApiResponse<>(1, playerDto, totalPlayerCount);

    }

}
