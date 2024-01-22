package com.example.ranking.domain.dto;

import com.example.ranking.domain.dto.animal.Animal;
import com.example.ranking.domain.dto.animal.Cat;
import com.example.ranking.domain.dto.animal.Deer;
import com.example.ranking.domain.dto.animal.Dog;
import com.example.ranking.domain.dto.animal.Fox;
import com.example.ranking.domain.dto.animal.Pig;
import com.example.ranking.domain.dto.animal.Sheep;
import com.example.ranking.domain.dto.animal.Tiger;
import com.example.ranking.domain.dto.animal.Whale;
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
public class GameResult {

    @NotEmpty(message = "플레이어 아이디 정보가 없습니다")
    private String playerId;

    //턴 라운드
    private Long round;
    private Long turn;

    //공격, 방어, 패스 지표
    private Long attackAttempt;
    private Long attackSuccess;
    private Long defenseAttempt;
    private Long defenseSuccess;
    private Long passCount;

    private Animal cat = new Cat();
    private Animal dog = new Dog();
    private Animal tiger = new Tiger();
    private Animal whale = new Whale();
    private Animal sheep = new Sheep();
    private Animal fox = new Fox();
    private Animal pig = new Pig();
    private Animal deer = new Deer();

    //동물 업적 관련 지표
//    private Long catAttackSuccess;
//    private Long catAttackFail;
//    private Long catDefenseSuccess;
//    private Long catDefenseFail;
//    private Long catTrust;
//    private Long catDistrust;
//    private Long catLie;
//    private Long catTrue;

/**
 *
 * "catAttackSuccess" : 7,
 * "catAttackFail" : 2,
 * "catDefenseSuccess" : 3,
 * "catDefenseFail" : 2,
 * "catTrust" : 1,
 * "catDistrust" : 1,
 * "catLie" : 2,
 * "catTrue" : 2,
 *
 * "tigerAttackSuccess" : 7,
 * "tigerAttackFail" : 2,
 * "tigerDefenseSuccess" : 3,
 * "tigerDefenseFail" : 2,
 * "tigerTrust" : 1,
 * "tigerDistrust" : 1,
 * "tigerLie" : 2,
 * "tigerTrue" : 2,
 *
 * "dogAttackSuccess" : 7,
 * "dogAttackFail" : 2,
 * "dogDefenseSuccess" : 3,
 * "dogDefenseFail" : 2,
 * "dogTrust" : 1,
 * "dogDistrust" : 1,
 * "dogLie" : 2,
 * "dogTrue" : 2,
 *
 *
 * "whaleAttackSuccess" : 7,
 * "whaleAttackFail" : 2,
 * "whaleDefenseSuccess" : 3,
 * "whaleDefenseFail" : 2,
 * "whaleTrust" : 1,
 * "whaleDistrust" : 1,
 * "whaleLie" : 2,
 * "whaleTrue" : 2,
 *
 * "foxAttackSuccess" : 7,
 * "foxAttackFail" : 2,
 * "foxDefenseSuccess" : 3,
 * "foxDefenseFail" : 2,
 * "foxTrust" : 1,
 * "foxDistrust" : 1,
 * "foxLie" : 2,
 * "foxTrue" : 2,
 *
 * "deerAttackSuccess" : 7,
 * "deerAttackFail" : 2,
 * "deerDefenseSuccess" : 3,
 * "deerDefenseFail" : 2,
 * "deerTrust" : 1,
 * "deerDistrust" : 1,
 * "deerLie" : 2,
 * "deerTrue" : 2,
 *
 * "sheepAttackSuccess" : 7,
 * "sheepAttackFail" : 2,
 * "sheepDefenseSuccess" : 3,
 * "sheepDefenseFail" : 2,
 * "sheepTrust" : 1,
 * "sheepDistrust" : 1,
 * "sheepLie" : 2,
 * "sheepTrue" : 2,
 *
 * "pigAttackSuccess" : 7,
 * "pigAttackFail" : 2,
 * "pigDefenseSuccess" : 3,
 * "pigDefenseFail" : 2,
 * "pigTrust" : 1,
 * "pigDistrust" : 1,
 * "pigLie" : 2,
 * "pigTrue" : 2,
 *
 *
 */

}
