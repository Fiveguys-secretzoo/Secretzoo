package com.ssafy.fiveguys.game.player.api;


import com.example.ranking.player.dto.PlayerDto;
import com.example.ranking.player.dto.response.Result;
import com.example.ranking.player.service.PlayerService;
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


    @GetMapping("/{playerSequence}")
    public Result getPlayerInfo(@PathVariable("playerSequence") Long playerSequence) {

        PlayerDto playerDto = playerService.getPlayerInfo(playerSequence);

        return new Result(1, playerDto);

    }

}
