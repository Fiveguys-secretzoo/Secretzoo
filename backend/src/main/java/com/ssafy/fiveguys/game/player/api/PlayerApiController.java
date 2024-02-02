package com.ssafy.fiveguys.game.player.api;



import com.ssafy.fiveguys.game.player.dto.PlayerDto;
import com.ssafy.fiveguys.game.player.dto.api.ApiResponse;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.service.PlayerService;
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
@RequiredArgsConstructor
@CrossOrigin("*")
public class PlayerApiController {

    private final PlayerService playerService;


    /**
     * player sequence로 player 정보조회
     * @param playerSequence
     * @return
     */
    @GetMapping("/{playerSequence}")
    public ApiResponse getPlayerInfo(@PathVariable("playerSequence") Long playerSequence) {


        //플레이어 정보 조회
        Player player = playerService.getPlayerInfo(playerSequence);
        // player sequence 가 db에 없는 경우 null 반환
        if(player == null) return null;
        // 전체 player 수
        int totalPlayerCount = playerService.playerTotalCount();

        //player 정보 조회에 필요한 데이터 dto 에 담기
        PlayerDto playerDto = new PlayerDto(playerSequence, player.getTotalRound(),
            player.getTotalTurn(), player.getRankingScore(), player.getExp(),
            player.getPlayerLevel());

        //ApiResponse 형태로 return
        return new ApiResponse(1, playerDto, totalPlayerCount);

    }

}
