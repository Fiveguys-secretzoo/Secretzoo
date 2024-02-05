package com.ssafy.fiveguys.game.player.dto;

import com.ssafy.fiveguys.game.player.entity.Rewards;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RewardsDto {

    private Long playerSequence;
    private Long userSequence;
    private String rewardsId;
    private String rewardsName;
    private Timestamp date; //업적 달성 날짜
    private boolean isDone;
    private int donePlayerCount;

    public RewardsDto(Long playerSequence, Long userSequence, Rewards rewards, Timestamp date, Boolean isDone, int donePlayerCount) {
        this.playerSequence = playerSequence;
        this.userSequence = userSequence;
        //지연 로딩 에러 -> entity 조회하면 자동으로 초기화 되므로 해결 가능
        this.rewardsId = rewards.getRewardsId();
        this.rewardsName = rewards.getRewardsName();
        this.date = date;
        this.isDone = isDone;
        this.donePlayerCount = donePlayerCount;
    }
}
