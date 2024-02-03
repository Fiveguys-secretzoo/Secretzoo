package com.ssafy.fiveguys.game.player.entity.embeddedType;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AnimalScore {


    private long attackSuccess = 0L;
    private long attackFail = 0L;
    private long defenseSuccess = 0L;
    private long defenseFail = 0L;
    private long trust = 0L;
    private long distrust = 0L;
    private long truth = 0L;
    private long lie = 0L;

    /**
     * AnimalScore sum 메서드
     */
    private static void sum(AnimalScore animalScore) {
//        animalScore.getAttackSuccess()
    }
}
