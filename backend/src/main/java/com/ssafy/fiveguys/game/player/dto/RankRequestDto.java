package com.ssafy.fiveguys.game.player.dto;

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

//    @NotEmpty(message = "플레이어 식별 번호가 없습니다")
//    private Long playerSequence;
//    @NotEmpty(message = "플레이어 아이디 정보가 없습니다")
//    private String playerId;

    @NotEmpty(message = "user sequence 가 없습니다")
    private Long userSequence;

    //턴 라운드
    private long round;
    private long turn;

    //공격, 방어, 패스 지표
    private Long attackAttempt;
    private Long attackSuccess;
    private Long defenseAttempt;
    private Long defenseSuccess;
    private Long passCount;

//    private Animal cat = new Cat();
//    private Animal dog = new Dog();
//    private Animal tiger = new Tiger();
//    private Animal whale = new Whale();
//    private Animal sheep = new Sheep();
//    private Animal fox = new Fox();
//    private Animal pig = new Pig();
//    private Animal deer = new Deer();

    //동물 업적 관련 지표
//    private Long catAttackSuccess;
//    private Long catAttackFail;
//    private Long catDefenseSuccess;
//    private Long catDefenseFail;
//    private Long catTrust;
//    private Long catDistrust;
//    private Long catLie;
//    private Long catTrue;


}
