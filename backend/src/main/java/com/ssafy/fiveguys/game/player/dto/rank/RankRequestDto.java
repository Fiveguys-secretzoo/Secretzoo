package com.ssafy.fiveguys.game.player.dto.rank;

import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 게임이 끝나고 프론트에서 받을 정보 DTO
 */

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankRequestDto {


    @NotEmpty(message = "user sequence 가 없습니다")
    private Long userSequence;

    //턴 라운드
    private long round;
    private long turn;

    //공격, 방어, 패스 지표
    private long attackAttempt;
    private long attackSuccess;
    private long defenseAttempt;
    private long defenseSuccess;
    private long passCount;



}
