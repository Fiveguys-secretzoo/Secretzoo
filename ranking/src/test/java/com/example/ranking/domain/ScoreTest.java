package com.example.ranking.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ScoreTest {


    @Test
    @DisplayName("점수 계산 확인 테스트")
    public void scoreTest() {

        //예상 득점 example
        double totalScore0 = RankingScore.scoreCalculator(1250L, 1250L);
        double totalScore1 = RankingScore.scoreCalculator(125L, 125L);
        double totalScore2 = RankingScore.scoreCalculator(125L, 5L);
        double totalScore3 = RankingScore.scoreCalculator(25L, 14L);

        System.out.println("totalScore0 = " + totalScore0);
        System.out.println("totalScore1 = " + totalScore1);
        System.out.println("totalScore2 = " + totalScore2);
        System.out.println("totalScore3 = " + totalScore3);
    }
}