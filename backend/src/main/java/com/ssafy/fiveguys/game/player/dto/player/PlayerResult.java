package com.ssafy.fiveguys.game.player.dto.player;

import com.ssafy.fiveguys.game.player.entity.Player;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlayerResult {
    List<PlayerDto> players;
    int totalCount;
}
